import React, { Component } from "react";
import { Accordion, Form, Menu } from "semantic-ui-react";

const ManuForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label="Gildan" name="manufacture" value="Gildan" />
      <Form.Checkbox
        label="Port & Company"
        name="manufacture"
        value="PortNCo"
      />
      <Form.Checkbox label="Jerzees" name="manufacture" value="Jerzees" />
      <Form.Checkbox label="Next Level" name="manufacture" value="Next Level" />
      <Form.Checkbox
        label="Comfort Colors"
        name="manufacture"
        value="Comfort Colors"
      />
      <Form.Checkbox label="Champion" name="manufacture" value="Champion" />
      <Form.Checkbox
        label="Bella Canvas"
        name="manufacture"
        value="Bella Canvas"
      />
      <Form.Checkbox
        label="Independent"
        name="manufacture"
        value="Independent"
      />
    </Form.Group>
  </Form>
);

const StyleForm = (
  <Form>
    <Form.Group grouped>
      <Form.Radio label="T-Shirt" name="style" type="radio" value="tshirt" />
      <Form.Radio
        label="Long Sleeve Tee"
        name="style"
        type="radio"
        value="lstee"
      />
      <Form.Radio
        label="Sweatshirt"
        name="style"
        type="radio"
        value="sweatshirt"
      />
      <Form.Radio label="Reglan" name="style" type="radio" value="reglan" />
      <Form.Radio label="Tank Top" name="style" type="radio" value="tanktop" />
    </Form.Group>
  </Form>
);

const SizeForm = (
  <Form>
    <Form.Group grouped>
      <Form.Radio label="Small" name="size" type="radio" value="small" />
      <Form.Radio label="Medium" name="size" type="radio" value="medium" />
      <Form.Radio label="Large" name="size" type="radio" value="large" />
      <Form.Radio label="X-Large" name="size" type="radio" value="xl" />
      <Form.Radio label="2XL" name="size" type="radio" value="2xl" />
      <Form.Radio label="3XL" name="size" type="radio" value="3xl" />
    </Form.Group>
  </Form>
);

export default class Sidebar extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
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
          <Accordion.Content active={activeIndex === 2} content={StyleForm} />
        </Menu.Item>
      </Accordion>
    );
  }
}
