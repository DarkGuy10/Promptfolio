import { Component } from 'react'

export type AppState = {
	record: Array<{ command: string; output: JSX.Element }>
	commands: Map<string, Command>
	projectDataLoaded: boolean
	userDataLoaded: boolean
	projectData?: any
	userData?: any
}

export type InputManagerState = {
	value: string
	suggestedValue: string
}

export type ListElementProps = {
	icon: string
	name: string
	link?: string
	description: string
	help?: boolean
}

export type Command = {
	name: string
	icon: string
	description: string
	execute(app: Component<{}, AppState>): void
}

export type Commands = Map<string, Command>
