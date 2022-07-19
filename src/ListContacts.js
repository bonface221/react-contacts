import { Component } from "react";
import propTypes from "prop-types";
import escapeStringRegexp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  static propTypes = {
    contacts: propTypes.array.isRequired,
    onDeleteContact: propTypes.func.isRequired,
  };
  state = {
    query: "",
  };
  updateQuery = (query) => this.setState({ query: query.trim() });
  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;
    let showingContacts;
    if (query) {
      const match = new RegExp(escapeStringRegexp(query), "i");
      showingContacts = contacts.filter((contact) => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }
    showingContacts.sort(sortBy("name"));
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            placeholder="Search Contacts"
            value={query}
            onChange={(e) => this.updateQuery(e.target.value)}
          />
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing
              <strong style={{ color: "red", paddingLeft: "4px" }}>
                {showingContacts.length}
              </strong>{" "}
              of {contacts.length}
            </span>
            <button
              onClick={() =>
                this.setState({
                  query: "",
                })
              }
            >
              Show all
            </button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className="contact-remove"
              ></button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
