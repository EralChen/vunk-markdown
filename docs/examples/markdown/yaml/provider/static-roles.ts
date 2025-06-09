import type { __VkAgentChatProvider } from '@vunk/plus/components/agent-chat-provider'
import type { __VkBubbleTemplates } from '@vunk/plus/components/bubble-templates'

export enum Role {
  User = 'user',
  Assistant = 'assistant',
  ECharts = 'ECharts',
}

type RoleMedia = __VkAgentChatProvider.RoleMediaBasic
  & (
  __VkBubbleTemplates.RenderItem
)

export const roleOptions: RoleMedia[] = [
  {
    label: '用户',
    value: Role.User,
    isMarkdown: false,
    placement: 'end',
    templateType: 'Typewriter',
  },
  {
    label: '助手',
    value: Role.Assistant,
    isMarkdown: true,
    placement: 'start',
    templateType: 'Typewriter',
  },

]

export const roleMap = roleOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<string, RoleMedia>)
