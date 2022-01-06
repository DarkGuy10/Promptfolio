import { React, Component, createRef } from 'react'
import styles from './styles/App.module.css'
import commands from './commands'
import { projects, github_username } from './config'

class InputManager extends Component {
	constructor(props) {
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
					className={styles.inputForm}>
					<span className={styles.suggested}>
						{this.state.suggestedValue}
					</span>
					<input
						className={`${styles.input} ${
							commands.has(value) ? styles.validCommand : ''
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
						onInput={({ target }) => {
							const value = target.value.toLowerCase().trim()
							let suggestedValue = ''
							if (value)
								for (const cmd of commands.values())
									if (cmd.name.startsWith(value)) {
										suggestedValue =
											' '.repeat(value.length) +
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

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			record: [],
			commands: commands,
			projectDataLoaded: false,
			userDataLoaded: false,
		}

		this.mainRef = createRef()

		this.handleExecute = commandName => {
			let output
			if (!commandName) output = <></>
			else if (!commands.has(commandName))
				output = <>promptfolio: command not found: {commandName}</>
			else output = commands.get(commandName).execute(this)
			if (output)
				this.setState({
					...this.state,
					record: [
						...this.state.record,
						{
							command: commandName,
							output: output,
						},
					],
				})
		}
	}

	async componentDidMount() {
		// Fetch project data from github
		const promises = projects.map(project =>
			fetch(`https://api.github.com/repos/${project}`).then(res =>
				res.json()
			)
		)
		const projectData = []
		for (const promise of promises) projectData.push(await promise)
		const userData = await fetch(
			`https://api.github.com/users/${github_username}`
		).then(res => res.json())
		this.setState({
			...this.state,
			projectDataLoaded: true,
			projectData: projectData,
			userDataLoaded: true,
			userData: userData,
		})
	}

	componentDidUpdate(prevProps, prevState) {
		// auto scroll
		if (prevState.record.length !== this.state.record.length)
			this.mainRef.current.scrollTo({
				top: this.mainRef.current.scrollHeight,
				left: 0,
				behavior: 'smooth',
			})
	}

	render() {
		const { record } = this.state
		return (
			<div className={styles.window}>
				<div className={styles.titleBar}>
					<span className={styles.dotHolder}>
						<span></span>
						<span></span>
						<span></span>
					</span>
					<span className={styles.titleHeader}>
						<i className="fa-fw fas fa-code"></i> Promptfolio
					</span>
					<span></span>
				</div>
				<div ref={this.mainRef} className={styles.mainContent}>
					{record.map(({ command, output }, index) => (
						<div key={index}>
							<span className={styles.promptPrefix}>
								<span>{github_username}</span>@
								<span>promptfolio:</span>
								~${' '}
								<span
									className={
										commands.has(command)
											? styles.validCommand
											: styles.invalidCommand
									}>
									{command}
								</span>
							</span>
							<div>{output}</div>
						</div>
					))}
					<InputManager handleExecute={this.handleExecute} />
				</div>
			</div>
		)
	}
}

export default App
