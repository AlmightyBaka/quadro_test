// Обычно кеширование приветствуется с помощью других специализированных архитектурных решений
// (например, внутренний кеш MySQL, который присутствует по дефолту),
// но здесь я приведу пример кеширования через JavaScript с помощью техники memoization
// Минусы этой техники - нельзя ограничить размер кеша, так как в JS массивы с уникальными поименными ключами
// не поддаются вычислению в .length(), соответсвенно и обрезать массив нельзя
// (можно считать количество ключей в массиве с помощью рефлексии, но это совсем уже геморно и неадекватно),
// отсутствие "протухания" кеша

export default () => {
    const cache = []

    return async (result, opts: any) => {
        if (cache[JSON.stringify(opts)]) {
            return cache[JSON.stringify(opts)]
        }

        cache[JSON.stringify(opts)] = result

        return result
    }
}
