

export function showDropDown(event, showMenu, changeState,closeMenu,eventListener){
    event.preventDefault()
    changeState({...showMenu},()=>eventListener())
}
