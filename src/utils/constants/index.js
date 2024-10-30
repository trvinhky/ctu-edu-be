const FORMATS = {
    OTHER: "other",
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio",
    DOCUMENT: "document",
    EXECUTE: "execute",
    CODE: "code",
    DATABASE: "database",
    GRAPHIC_DESIGN: "graphics and design",
    PRE_SHEET: "Presentations and spreadsheets"
}

const DESCRIPTIONS = {
    OTHER: "khác",
    IMAGE: "hình ảnh",
    VIDEO: "video",
    AUDIO: "âm thanh",
    DOCUMENT: "văn bản",
    EXECUTE: "thực thi",
    CODE: "lập trình",
    DATABASE: "cơ sở dữ liệu",
    GRAPHIC_DESIGN: "đồ họa và thiết kế",
    PRE_SHEET: "trình bày và bảng tính"
}

const STATUS = {
    PENDING: 'chờ xác nhận',
    CONFIRM: 'xác nhận',
    CANCEL: 'hủy'
}

const ACCEPT = {
    OTHER: "*",
    IMAGE: ".jpg,.jpeg,.png,.gif,.bmp,.svg,.tiff",
    VIDEO: ".mp4,.mkv,.avi,.mov,.wmv",
    AUDIO: ".mp3,.wav,.ogg,.flac,.m4a",
    DOCUMENT: ".txt,.docx,.pdf,.odt,.rtf,.md",
    EXECUTE: ".exe,.bat,.sh,.apk,.msi",
    CODE: ".js,.ts,.html,.css,.json,.xml,.py,.java,.c,.cpp,.rb,.go,.php,.sql",
    DATABASE: ".db,.sqlite,.sql,.mdb",
    GRAPHIC_DESIGN: ".psd,.ai,.sketch,.xd",
    PRE_SHEET: ".pptx,.xlsx,.ods"
}

module.exports = { FORMATS, STATUS, ACCEPT, DESCRIPTIONS }