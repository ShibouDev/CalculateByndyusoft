import { Component } from "react";

import { initialState } from "../libs/const";
import execOp from "./execOp";

import Button from "../components/Button/Button";
import Display from "../components/Display/Display";

import "./Calculate.css";

export class Calculator extends Component {
	state = initialState;

	clearMemory() {
		this.setState(initialState);
	}

	setOperation(operation: string) {
		if (this.state.current === 0) {
			this.setState({ operation, current: 1, clearDisplay: true });
		} else {
			const equals = operation === "=";
			const currentOperation = this.state.operation;

			const values = [...this.state.values];
			values[0] = execOp(currentOperation, values[0], values[1]);
			values[1] = 0;

			this.setState({
				displayValue: values[0],
				operation: equals ? null : operation,
				current: equals ? 0 : 1,
				clearDisplay: !equals,
				values,
			});
		}
	}

	addDigit(n: string) {
		if (n === "." && this.state.displayValue.includes(".")) return;
		const clearDisplay =
			this.state.displayValue === "0" || this.state.clearDisplay;

		const currentValue = clearDisplay ? "" : this.state.displayValue;
		const displayValue = currentValue + n;
		this.setState({ displayValue, clearDisplay: false });

		if (n !== ".") {
			const currentIndex = this.state.current;
			const newValue = parseFloat(displayValue);
			const values = [...this.state.values];
			values[currentIndex] = newValue;
			this.setState({ values });
		}
	}

	handlerKeymap = (e: KeyboardEvent) => {
		switch (e.key) {
			case "Escape": {
				this.clearMemory();
				break;
			}

			case "Enter": {
				this.setOperation("=");
				break;
			}
			case "-": {
				this.setOperation("-");
				break;
			}

			case "/": {
				this.setOperation("/");
				break;
			}

			case "%": {
				this.setOperation("%");
				break;
			}

			case "√": {
				this.setOperation("√");
				break;
			}

			case "*": {
				this.setOperation("*");
				break;
			}

			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9": {
				this.addDigit(e.key);
				break;
			}
		}
	};

	render(): JSX.Element {
		const addDigit = (n: string) => this.addDigit(n);
		const setOperation = (op: string) => this.setOperation(op);
		const clearMemory = () => this.clearMemory();

		document.addEventListener("keydown", this.handlerKeymap);

		return (
			<div className="wrapper">
				<div className="calculator">
					<Display value={this.state.displayValue} />
					<Button label="C" click={clearMemory} />
					<Button label="√" click={setOperation} operation />
					<Button label="%" click={setOperation} operation />
					<Button label="/" click={setOperation} operation />
					<Button label="7" click={addDigit} />
					<Button label="8" click={addDigit} />
					<Button label="9" click={addDigit} />
					<Button label="*" click={setOperation} operation />
					<Button label="4" click={addDigit} />
					<Button label="5" click={addDigit} />
					<Button label="6" click={addDigit} />
					<Button label="-" click={setOperation} operation />
					<Button label="1" click={addDigit} />
					<Button label="2" click={addDigit} />
					<Button label="3" click={addDigit} />
					<Button label="+" click={setOperation} operation />
					<Button label="00" click={addDigit} />
					<Button label="0" click={addDigit} />
					<Button label="," click={addDigit} />
					<Button label="=" click={setOperation} operation />
				</div>
			</div>
		);
	}
}

export default Calculator;
