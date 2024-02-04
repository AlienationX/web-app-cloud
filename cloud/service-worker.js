// - networkFirst
// - cacheFirst
// - fastest
// - cacheOnly
// - networkOnly

// networkFirst是显示完成后，SW优先和后端通讯，看接口是否更新，下一次刷新则是采用最新数据内容。
// cacheFirst则是优先考虑缓存，如果缓存没有命中，才会去请求接口拿新数据，这个选型适合那种不经常更改的内容或者有别的更新机制。
// fastest则是两个同时进行，哪个快执行哪个。
// cacheOnly和networkOnly比较不常用。

console.log('service-worker starting...');
