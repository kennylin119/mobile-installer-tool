import Icon from './Icon'

const Icons = ({ icons }) => {
    console.log(icons)

    return (
        // Using a map function to render each icon
        <div className='icons'>
            <h3>Icons List: </h3>
            {
                Object.keys(icons).map(function(keyName, keyIndex) {
                    // console.log(keyName + ", " + keyIndex)

                    // FIXME: this is not printing each icon's value
                    <Icon key = {keyName} value = {keyIndex}></Icon>
                })
            }
        </div>
    )
}

export default Icons