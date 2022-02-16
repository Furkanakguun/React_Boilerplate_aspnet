import * as React from 'react';

interface IStudentFormProps {
	name: string;
	handleChange(event: any): void;
}


export default class StudentForm extends React.Component<IStudentFormProps, any> {
    constructor(props: IStudentFormProps) {
        super(props);
    }

	public render() {
		return (
            <div>
                <input 
                    value={ this.props.name }
                    onChange={ e => this.props.handleChange(e) }
                />
            </div>
        );
	}
}