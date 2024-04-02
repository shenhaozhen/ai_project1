import {create} from 'zustand'

export const useDataStore = create((set) => ({
    items: [],
    add: (item) => set((state) => ({ items: [...state.items, item] })),
    replace: (items) => set({ items }),
    remove: (item) =>   
        set((state) => ({ items: state.items.filter((i) => i !== item) })),
    clear: () => set({ items: [] }),
}))


export const useChatStore = create((set) => ({
    chats: [[]],
    add: (chat) => set((state) => ({ chats: [...state.chats, chat] })), //添加对话
    replace: (chats) => set({ chats }), //替换对话
    update: (chat,index) => set((state) => ({ chats: state.chats.map((c, idx) => (idx === index ? chat : c)) })), //更新对话
    delete: (chat) => set((state) => ({ chats: state.chats.filter((c) => c.id !== chat.id) })),
    clear: () => set({ chats: [] }),
}))

export const useActiveStore = create((set) => ({
    active: 0,
    replace: (active) => set({ active }),
    clear: () => set({ active: 0 }),
}))


export const useAIModeStore = create((set) => ({
    AIMode: 0,
    setAIMode: (mode) => set({ AIMode: mode }),
}))
  
