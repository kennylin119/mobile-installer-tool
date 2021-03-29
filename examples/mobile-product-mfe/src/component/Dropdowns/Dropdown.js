import DropdownButton from 'react-bootstrap/DropdownButton';

const Dropdown = () => {
    return (
        <DropdownButton id="dropdown-item-button" title="Dropdown button">
            <Dropdown.Item as="button">Action</Dropdown.Item>
            <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
    )
}

export default Dropdown
