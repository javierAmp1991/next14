export function addInitialPositionTabs(name: string, num: number) {
    window.sessionStorage.setItem(name, `${num}`)
}