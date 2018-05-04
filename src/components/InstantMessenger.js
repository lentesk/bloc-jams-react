import React, { Component } from 'react';

const Title = (props) => {
  const {chatName} = props;
  return (
    <div className="header">
      {chatName} - Instant Message
      <ul className="header__links">
        <li className="header__minimize">_</li>
        <li className="header__maximize">[]</li>
        <li className="header__close">&times;</li>
      </ul>
    </div>
  );
}
const Navbar = ({chatName}) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">File</li>
        <li className="nav__item">Edit</li>
        <li className="nav__item">Insert</li>
      </ul>
      <span className="nav__warning-level">{chatName}s Warning Level: 420%</span>
    </nav>
  );
}
const MessageItem = ({message, screenName, className}) => {
  const { text, id } = message;
  return (
    <div className={`message-item ${className}`}>
      <div className="message-item__screenname">{screenName}:</div>
      {text}
    </div>
  )
}
const MessageList = (props) => {
  const { messageData, screenName, chatName } = props;
  const currentMessage = { text: "What's gucci my dude? Plz enjoy my tuneskis", id: 1 };
  return (
    <div className="message-list">
      <div className="message-list__container">
        <MessageItem
          message={currentMessage}
          className="message-item--other"
          screenName={chatName}
        />
        { messageData.map((message, i) => {
            return (
              <MessageItem message={message} screenName={screenName} key={i}/>
            );
          })
        }
      </div>
    </div>
  );
}
const CustomizeRow = (props) => {
  return (
    <div className='customize-row'>
      <div className='customize-row__set'>
        <button className='customize-row__button text-blue'>A</button>
        <button className='customize-row__button background-blue'>A</button>
      </div>
      <div className='customize-row__set'>
        <button className='customize-row__button small-a'>A</button>
        <button className='customize-row__button medium-a'>A</button>
        <button className='customize-row__button large-a'>A</button>
      </div>
      <div className='customize-row__set'>
        <button className='customize-row__button bold-text'>B</button>
        <button className='customize-row__button italic-text'>I</button>
        <button className='customize-row__button underline-text'>u</button>
      </div>
      <div className='customize-row__set'>
        <button className='customize-row__button link-text'>link</button>
        <button className="customize-row__button">
          <img src="http://www.jesush.com/wp-content/uploads/2008/07/happy10.gif" />
        </button>
      </div>
    </div>
  );
}
const MessageForm = ({value, addedMessage, onChange}) => {
  const disabledClass = !value.length ? 'message-form__submit--disabled' : null;
  return (
    <form className="message-form" onSubmit={(e)=> {addedMessage(e, value)}}>
      <textarea
        className="message-form__textarea"
        value={value}
        onChange={onChange}
      />
      <div className="message-form__actions">
        <button
          type="button"
          onClick={(e)=> {addedMessage(e, value)}}
          disabled={!value.length}
          className={`message-form__submit ${disabledClass}`}></button>
      </div>
    </form>
  );
}
let messageId = 0;
class InstantMessenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatName: "J∆ME$ON",
      screenName: "xXTruFanXx_<3",
      data: [],
      value: ""
    };
  }
  addedMessage = (e, val) => {
    e.preventDefault();
    const message = {text: val, id: messageId++};
    this.state.data.push(message);
    this.setState({data: this.state.data, value: ""});
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  render() {
    const { data, chatName, screenName, value } = this.state;
    return (
      <div className="instant-messenger">
        <Title chatName={chatName} />
        <Navbar chatName={chatName} />
        <MessageList
          messageData={data}
          screenName={screenName}
          chatName={chatName}
        />
        <CustomizeRow />
        <MessageForm
          addedMessage={this.addedMessage}
          onChange={this.handleChange}
          value={value}
        />
      </div>
    );
  }
}

export default InstantMessenger;
