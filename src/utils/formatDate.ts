export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    if(date.toDateString() === today.toDateString()) return "Сегодня"
    if(date.toDateString() === yesterday.toDateString()) return "Вчера"

    return date.toLocaleDateString("ru-RU")
}