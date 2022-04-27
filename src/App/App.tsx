import React, { Component, createRef, RefObject } from 'react'
import styles from './App.module.scss'
import commands from '../commands/commands'
import { projects, github_username } from '../config'
import { AppState } from '../typings'
import InputManager from '../InputManager/InputManager'

class App extends Component<{}, AppState> {
	mainRef: RefObject<any>
	handleExecute: (arg: string) => void

	constructor(props: any) {
		super(props)
		this.state = {
			record: [],
			commands: commands,
			projectDataLoaded: false,
			userDataLoaded: false,
		}

		this.mainRef = createRef()

		this.handleExecute = arg => {
			const { commands } = this.state
			const commandName = arg.trim()
			let output
			if (!commandName) output = <></>
			else if (!commands.has(commandName))
				output = <>promptfolio: command not found: {commandName}</>
			else output = commands.get(commandName)?.execute(this)
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

	componentDidUpdate(_: any, prevState: AppState) {
		// auto scroll
		if (
			prevState.record.length !== this.state.record.length &&
			this.mainRef?.current
		)
			this.mainRef.current.scrollTo({
				top: this.mainRef.current.scrollHeight,
				left: 0,
				behavior: 'smooth',
			})
	}

	render() {
		const { record } = this.state
		return (
			<div className={styles.wrapper}>
				<div className={styles.window}>
					<div className={styles.titleBar}>
						<div className={styles.dotHolder}>
							<div className={styles.dot}></div>
							<div className={styles.dot}></div>
							<div className={styles.dot}></div>
						</div>
						<div className={styles.titleHeader}>
							<i className="fa-fw fas fa-code"></i> Promptfolio
						</div>
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
										}
									>
										{command}
									</span>
								</span>
								<div>{output}</div>
							</div>
						))}
						<InputManager handleExecute={this.handleExecute} />
					</div>
				</div>
			</div>
		)
	}
}

export default App
