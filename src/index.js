import React from 'react';
import ReactDOM from 'react-dom/client';

class Ex1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            borderColor: ''
        };
    }

    handleChange = (event) => {
        const value = event.target.value;
        let borderColor = '';
        if (value.length >= 4 && value.length <= 9) {
            borderColor = 'blue';
        } else {
            borderColor = 'yellow';
        }
        this.setState({ value, borderColor });
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.value}
                    style={{ borderColor: this.state.borderColor }}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

class Ex2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { id: 1, firstName: "Eren", lastName: "Jager", salary: 1000, gender: "Ч" },
                { id: 2, firstName: "Mikasa", lastName: "Akerman", salary: 1500, gender: "Ж" },
                { id: 3, firstName: "Erwin", lastName: "Smith", salary: 2000, gender: "Ч" },
                { id: 4, firstName: "Grisha", lastName: "Jager", salary: 2500, gender: "Ж" },
            ],
            newEmployee: {
                firstName: "",
                lastName: "",
                salary: "",
                gender: "Ч",
            },
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState((prevState) => ({
            newEmployee: {
                ...prevState.newEmployee,
                [name]: value,
            },
        }));
    };

    handleSelectChange = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState((prevState) => ({
            newEmployee: {
                ...prevState.newEmployee,
                gender: value,
            },
        }));
    };

    handleAddEmployee = (event) => {
        event.preventDefault();
        const newEmployee = this.state.newEmployee;
        newEmployee.id = Date.now();
        this.setState((prevState) => ({
            employees: [...prevState.employees, newEmployee],
            newEmployee: {
                firstName: "",
                lastName: "",
                salary: "",
                gender: "Ч",
            },
        }));
    };

    render() {
        const employeeRows = this.state.employees.map((employee) => (
            <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.salary}</td>
                <td>{employee.gender}</td>
            </tr>
        ));

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Зарплата</th>
                            <th>Стать</th>
                        </tr>
                    </thead>
                    <tbody>{employeeRows}</tbody>
                </table>
                <form onSubmit={this.handleAddEmployee}>
                    <div>
                        <label>
                            Ім'я:
                            <input
                                type="text"
                                name="firstName"
                                value={this.state.newEmployee.firstName}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Прізвище:
                            <input
                                type="text"
                                name="lastName"
                                value={this.state.newEmployee.lastName}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Зарплата:
                            <input
                                type="text"
                                name="salary"
                                value={this.state.newEmployee.salary}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Стать:
                            <select name="gender" value={this.state.newEmployee.gender} onChange={this.handleSelectChange}>
                                <option value="male">Ч</option>
                                <option value="female">Ж</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit">Добавити працівника</button>
                </form>
            </div>
        );
    }
}

class Ex3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { id: 1, firstName: "Eren", lastName: "Jager", salary: 1000 },
                { id: 2, firstName: "Aizen", lastName: "Sosuke", salary: 1500 },
                { id: 3, firstName: "Obito", lastName: "Uchiha", salary: 2000 },
                { id: 4, firstName: "Minato", lastName: "Namikadze", salary: 2500 },
                { id: 5, firstName: "Tsunade", lastName: "Senju", salary: 3000 },
                { id: 6, firstName: "Hashirama", lastName: "Senju", salary: 3500 },
                { id: 7, firstName: "Madara", lastName: "Uchiha", salary: 4000 },
                { id: 8, firstName: "Rainer", lastName: "Brown", salary: 4500 },
                { id: 9, firstName: "Bertold", lastName: "Guver", salary: 5000 },
                { id: 10, firstName: "Armin", lastName: "Arlert", salary: 5500 },
                { id: 11, firstName: "Ichigo", lastName: "Kurasaki", salary: 6000 },
                { id: 12, firstName: "Hero", lastName: "016", salary: 6500 },
                { id: 13, firstName: "Kenpachi", lastName: "Zaraki", salary: 7000 },
                { id: 14, firstName: "Yamamoto", lastName: "Genrusai", salary: 7500 },
                { id: 15, firstName: "Annie", lastName: "Leonthard", salary: 8000 },
                { id: 16, firstName: "Naruto", lastName: "Uzumaki", salary: 8500 },
                { id: 17, firstName: "Sasuke", lastName: "Uchiha", salary: 9000 },
                { id: 18, firstName: "Sakura", lastName: "Haruno", salary: 9500 },
                { id: 19, firstName: "Light", lastName: "Yagami", salary: 10000 },
                { id: 20, firstName: "Sikstina", lastName: "Fibel", salary: 10500 },
            ],
            currentPage: 1,
        };
    }

    handlePageClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id),
        });
    };

    render() {
        const employees = this.state.employees;
        const currentPage = this.state.currentPage;

        
        const indexOfLastEmployee = currentPage * 10;
        const indexOfFirstEmployee = indexOfLastEmployee - 10;
        const currentEmployees = employees.slice(
            indexOfFirstEmployee,
            indexOfLastEmployee)
            
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(employees.length / 10); i++) {
            pageNumbers.push(i);
        }

        
        const renderEmployees = currentEmployees.map((employee) => {
            return (
                <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.salary}</td>
                </tr>
            );
        });

       
        const renderPageNumbers = pageNumbers.map((number) => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                    className={currentPage === number ? "active" : ""}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>{renderEmployees}</tbody>
                </table>
                <ul id="page-numbers">{renderPageNumbers}</ul>
            </div>
        );
    }
}

class Ex4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityOptions: [],
            selectedCity: "",
        };
    }

    handleAddCity = () => {
        const cityInput = document.querySelector("#cityInput");
        const city = cityInput.value.trim();
        if (city === "") {
            return;
        }
        this.setState((prevState) => ({
            cityOptions: [...prevState.cityOptions, city],
        }));
        cityInput.value = "";
    };

    handleCityChange = (event) => {
        this.setState({
            selectedCity: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <input type="text" id="cityInput" />
                <button onClick={this.handleAddCity}>добавити місто</button>
                <select value={this.state.selectedCity} onChange={this.handleCityChange}>
                    <option value="">Вибрати місто</option>
                    {this.state.cityOptions.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {this.state.selectedCity !== "" && (
                    <p>You selected {this.state.selectedCity}</p>
                )}
            </div>
        );
    }
}

class Ex6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: [
                {
                    question: 'Question 1',
                    answers: [
                        'Answer1',
                        'Answer2',
                        'Answer3',
                        'Answer4',
                        'Answer5',
                    ],
                    right: 3, //номер правильної відповіді
                    selected: null, //вибрана відповідь
                },
                {
                    question: 'Question 2',
                    answers: [
                        'Answer1',
                        'Answer2',
                        'Answer3',
                        'Answer4',
                        'Answer5',
                    ],
                    right: 1, //номер правильної відповіді
                    selected: null, //вибрана відповідь
                },
                {
                    question: 'Question 3',
                    answers: [
                        'Answer1',
                        'Answer2',
                        'Answer3',
                        'Answer4',
                        'Answer5',
                    ],
                    right: 4, //номер правильної відповіді
                    selected: null, //вибрана відповідь
                },
            ],
        };
    }

    handleAnswerChange = (questionIndex, answerIndex) => {
        const { test } = this.state;
        const question = test[questionIndex];
        question.selected = answerIndex;
        this.setState({
            test: [...test],
        });
    };

    render() {
        const { test } = this.state;

        return (
            <div>
                {test.map((question, questionIndex) => (
                    <div key={questionIndex} className={question.selected === question.right ? 'correct' : 'incorrect'}>
                        <p>{question.question}</p>
                        {question.answers.map((answer, answerIndex) => (
                            <div key={answerIndex}>
                                <input
                                    type="radio"
                                    name={`answer${questionIndex}`}
                                    value={answerIndex}
                                    checked={question.selected === answerIndex}
                                    onChange={() => this.handleAnswerChange(questionIndex, answerIndex)}
                                />
                                {answer}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}




const root = ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
        <p>Ex1</p>
        <Ex1 />

        <p>Ex2</p>
        <Ex2 />

        <p>Ex3</p>
        <Ex3 />

         <p>Ex4</p>
        <Ex4 />

        <p>Ex6</p>
        <Ex6 />

        
    </div>

);