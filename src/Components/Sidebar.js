import React, { Component } from "react";
import { Form, Accordion, Menu } from "semantic-ui-react";

export default class Sidebar extends Component {
  state = {
    activeIndex: 0,
    manufacture: null,
    size: "",
    style: "",
    gender: "",
    age: ""
  };

  handleChange = (e, { name, value }) => {
    if (name === "age") {
      this.props.age(value);
    } else if (name === "manufacture") {
      this.props.manufacture(value);
    } else if (name === "style") {
      this.props.style(value);
    } else if (name === "size") {
      this.props.size(value);
    } else if (name === "gender") {
      this.props.gender(value);
    }
    this.setState({ [name]: value });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const ManuForm = (
      <Form>
        <Form.Group grouped>
          <Form.Radio
            label="Gildan"
            name="manufacture"
            value="Gildan"
            checked={this.state.manufacture === "Gildan"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Jerzees"
            name="manufacture"
            value="Jerzees"
            checked={this.state.manufacture === "Jerzees"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Next Level"
            name="manufacture"
            value="Next Level"
            checked={this.state.manufacture === "Next Level"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Comfort Colors"
            name="manufacture"
            value="Comfort Colors"
            checked={this.state.manufacture === "Comfort Colors"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Champion"
            name="manufacture"
            value="Champion"
            checked={this.state.manufacture === "Champion"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Bella Canvas"
            name="manufacture"
            value="Bella Canvas"
            checked={this.state.manufacture === "Bella Canvas"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Independent"
            name="manufacture"
            value="Independent"
            checked={this.state.manufacture === "Independent"}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );

    const SizeForm = (
      <Form>
        <Form.Group grouped>
          <Form.Radio
            label="Small"
            name="size"
            type="radio"
            value="S"
            checked={this.state.size === "S"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Medium"
            name="size"
            type="radio"
            value="M"
            checked={this.state.size === "M"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Large"
            name="size"
            type="radio"
            value="L"
            checked={this.state.size === "L"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="X-Large"
            name="size"
            type="radio"
            value="XL"
            checked={this.state.size === "XL"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="2XL"
            name="size"
            type="radio"
            value="2XL"
            checked={this.state.size === "2XL"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="3XL"
            name="size"
            type="radio"
            value="3XL"
            checked={this.state.size === "3XL"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="4XL"
            name="size"
            type="radio"
            value="4XL"
            checked={this.state.size === "4XL"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="5XL"
            name="size"
            type="radio"
            value="5XL"
            checked={this.state.size === "5XL"}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );

    const styleForm = (
      <Form>
        <Form.Group grouped>
          <Form.Radio
            label="T-Shirt"
            name="style"
            type="radio"
            value="T-Shirt"
            checked={this.state.style === "T-Shirt"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Long Sleeve Tee"
            name="style"
            type="radio"
            value="Long Sleeve"
            checked={this.state.style === "Long Sleeve"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Sweatshirt"
            name="style"
            type="radio"
            value="Sweatshirt"
            checked={this.state.style === "Sweatshirt"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Raglan"
            name="style"
            type="radio"
            value="Raglan"
            checked={this.state.style === "Raglan"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Tank Top"
            name="style"
            type="radio"
            value="Tank Top"
            checked={this.state.style === "Tank Top"}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );

    const genderForm = (
      <Form>
        <Form.Group grouped>
          <Form.Radio
            label="Men"
            name="gender"
            type="radio"
            value="Men"
            checked={this.state.gender === "Men"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Women"
            name="gender"
            type="radio"
            value="Women"
            checked={this.state.gender === "Women"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Unisex"
            name="gender"
            type="radio"
            value="Unisex"
            checked={this.state.gender === "Unisex"}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
    const ageForm = (
      <Form>
        <Form.Group grouped>
          <Form.Radio
            label="Adult"
            name="age"
            type="radio"
            value="Adult"
            checked={this.state.age === "Adult"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Youth"
            name="age"
            type="radio"
            value="Youth"
            checked={this.state.age === "Youth"}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );

    const { activeIndex } = this.state;

    return (
      <Accordion as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content="Size"
            index={0}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 0} content={SizeForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content="Manufactures"
            index={1}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 1} content={ManuForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 2}
            content="Styles"
            index={2}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 2} content={styleForm} />
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 3}
            content="Gender"
            index={3}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 3} content={genderForm} />
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 4}
            content="Age"
            index={4}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 4} content={ageForm} />
        </Menu.Item>
      </Accordion>
    );
  }
}
