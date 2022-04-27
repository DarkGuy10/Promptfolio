import React, { Component, RefObject, createRef } from 'react'
import commands from '../commands/commands'
import { github_username } from '../config'
import { InputManagerState } from '../typings'
import styles from './InputManager.module.scss'

class InputManager extends Component<
	{ handleExecute: (commandName: string) => void },
	InputManagerState
> {
	inputRef: RefObject<any>
	updateInputField: (value?: string) => void

	constructor(props: { handleExecute: (commandName: string) => void }) {
		super(props)
		this.state = {
			value: '',
			suggestedValue: '',
		}
		this.inputRef = createRef()
		this.updateInputField = (value = '') => {
			this.inputRef.current.value = value
		}
	}
	render() {
		const { value } = this.state
		return (
			<div className={styles.inputWrapper}>
				<span className={styles.promptPrefix}>
					<span>{github_username}</span>@<span>promptfolio:</span>
					~$&nbsp;
				</span>
				<form
					action="#"
					onSubmit={event => {
						event.preventDefault()
						this.setState({ value: '', suggestedValue: '' })
						this.updateInputField()
						this.props.handleExecute(value)
					}}
					className={styles.inputForm}
				>
					<span className={styles.suggested}>
						{this.state.suggestedValue}
					</span>
					<input
						className={`${styles.input} ${
							commands.has(value.trim())
								? styles.validCommand
								: ''
						}`}
						spellCheck={false}
						placeholder="confused? type help and hit enter to get started!"
						ref={this.inputRef}
						autoFocus
						onKeyDown={event => {
							const { value, suggestedValue } = this.state
							if (
								(event.key === 'Tab' ||
									event.key === 'ArrowRight') &&
								suggestedValue
							) {
								event.preventDefault()
								const newValue = value + suggestedValue.trim()
								this.updateInputField(newValue)
								this.setState({
									value: newValue,
									suggestedValue: '',
								})
							}
						}}
						onInput={event => {
							const target = event.target as HTMLInputElement

							// value is trimmed, but event.target.value isnt
							const value = target.value.trimStart().toLowerCase()

							let suggestedValue = ''
							if (value)
								for (const cmd of commands.values())
									if (cmd.name.startsWith(value)) {
										suggestedValue =
											' '.repeat(target.value.length) +
											cmd.name.substring(value.length)
										break
									}

							this.setState({
								value: value,
								suggestedValue: suggestedValue,
							})
						}}
					/>
				</form>
			</div>
		)
	}
}

export default InputManager
