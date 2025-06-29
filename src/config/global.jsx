import { message } from "antd"

window.MessageAlert = (text, type) => {
    switch (type) {
        case "success": return message.success(text)
        case "error": return message.error(text)
        case "warning": return message.warning(text)
        case "info": return message.info(text)
        default: message.info(text)
    }
}