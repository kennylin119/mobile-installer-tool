import styled from 'styled-components'

const ProductHeader = styled.div `
    width = 100%;
    // height = 5%;
    background: #fff;
    // position: fixed;
    
    display: flex;
    flex-direction: row;

    border: 1px solid #115b67;
`;

const Title = styled.h1`
    margin-left: 1rem;
    font-family: "HelveticaNeue Regular", sans-serif;
`;

const Icon = styled.img`
    margin-left: 5%;
    width: 3rem;
    height: 3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
}

const Header = (props) => {

    const { product_name, img_src } = props;

    return (
        <ProductHeader>
            <Icon src={img_src} />
            <Title>
                {upperCaseFirstLetter(product_name)}
            </Title>
        </ProductHeader>
    )
}

export default Header