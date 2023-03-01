export interface ILocationState {
  background: {
		pathname: string;
		search: string;
		hash: string;
		state: null;
		key: string;
	}
	from: string;
	state?: object;
}