import './Message.css';

const Message = ({msg, type}) => {
    // console.log(msg)
    return (
        <div className={`message ${type}`}>
            <p>{msg}</p>
        </div>
    )
}


export default Message;