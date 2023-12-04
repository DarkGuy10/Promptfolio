import React from 'react'
const github_username = 'darkguy10'
const discord_usertag = 'HaiseSasaki#7599'
const discord_userid = '755109987474473059'
const email = 'harperburn@protonmail.ch'

const projects = [
	'darkguy10/BotClient',
	'darkguy10/Shellplate',
	'darkguy10/Fakestream',
	'darkguy10/ControlPanelAPI.js',
	'darkguy10/Deb8M8',
	'darkguy10/EmojiSteal',
]

const links = [
	{
		name: 'GitHub',
		icon: 'fab fa-fw fa-github',
		link: 'https://github.com/darkguy10',
		description: 'My profile on GitHub',
	},
	{
		name: 'Website',
		icon: 'fas fa-fw fa-coffee',
		link: 'https://darkguy10.github.io/',
		description: 'Personal website',
	},
	{
		name: 'Discord',
		link: `https://discord.com/users/${discord_userid}`,
		icon: 'fab fa-fw fa-discord',
		description: `${discord_usertag} | Add me as friend!`,
	},
	/*
	{
		name: 'E-mail',
		icon: 'fas fa-fw fa-at',
		link: `mailto:${email}`,
		description: 'Lets get in touch!',
	},
*/
]

const info = (
	<>
		<p>Yo! I'm a highschooler who codes as a hobby.</p>
		<p>
			I've got intermediate experience with{' '}
			<span className="highlighted">JavaScript</span> and{' '}
			<span className="highlighted">Node.js</span>.
		</p>
		<p>
			I've been doing{' '}
			<span className="highlighted">front-end web designing</span> as a
			fun pastime for a couple of years now. Currently, I'm learning{' '}
			<span className="highlighted">React</span> and{' '}
			<span className="highlighted">Next.js</span>
		</p>
		<p>
			Aside from that, I have basic knowledge of{' '}
			<span className="highlighted">python</span>,{' '}
			<span className="highlighted">java</span> and{' '}
			<span className="highlighted">shell scripting.</span>
		</p>
	</>
)

export {
	github_username,
	discord_usertag,
	discord_userid,
	email,
	projects,
	links,
	info,
}
