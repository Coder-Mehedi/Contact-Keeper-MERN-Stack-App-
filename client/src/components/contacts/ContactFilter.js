import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../contexts/contact/contactContext";

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const text = useRef("");
	const { filterContact, clearFilter, filtered } = contactContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = "";
		}
	});

	const onChange = (e) => {
		if (text.current.value !== "") {
			filterContact(e.target.value);
		} else {
			clearFilter();
		}
	};
	return (
		<form>
			<input
				type="text"
				ref={text}
				placeholder="Filter Contacts..."
				onChange={onChange}
			/>
		</form>
	);
};

export default ContactFilter;
