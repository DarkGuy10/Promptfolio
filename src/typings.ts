type AppState = {
  record: Array<{ command: string; output: JSX.Element }>;
  commands: Map<string, Command>;
  projectDataLoaded: boolean;
  userDataLoaded: boolean;
  projectData?: any;
  userData?: any;
};

type InputManagerState = {
  value: string;
  suggestedValue: string;
};

type ListElementProps = {
  icon: string;
  name: string;
  link?: string;
  description: string;
  help?: boolean;
};

type Command = {
  name: string;
  icon: string;
  description: string;
  execute(app: any): void;
};

type Commands = Map<string, Command>;

export { AppState, InputManagerState, ListElementProps, Command, Commands };
