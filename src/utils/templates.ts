/* eslint-disable no-useless-escape */
import { Boolean, Object, Optional, Static, String } from '@sinclair/typebox'
import { i18n } from 'src/boot/i18n'

const GenDialogTitle = `
<instructions>
  Your task is to analyze the provided chat history between a user and an assistant and generate a concise, relevant title summarizing the conversation.
  Follow these rules strictly:

  1.  **Language:** The title's language must match the predominant language used in the chat history.
  2.  **Length:**
      - If the language is English, the title text should be approximately 3-5 words long.
      - If the language is not English (e.g., Chinese), aim for an equivalent length (e.g., approximately 6-10 characters).
  3.  **Format:** The title must start with a single relevant emoji, followed by a single space, and then the title text.
      - Format: \`[emoji] [Title Text]\`
  4.  **Content:** The title should accurately capture the main topic, question, or goal of the conversation.
  5.  **Output:** Generate *only* the title in the specified format. Do not include any explanations or surrounding text.

</instructions>

<input>
  <description>Chat history between user and assistant:</description>
  <chat_history>
    {%- for content in contents %}
    {%- if content.type == 'user-message' %}
    <user_message>
      {{ content.text }}
    </user_message>
    {%- elsif content.type == 'assistant-message' %}
    <assistant_message>
      {{ content.text }}
    </assistant_message>
    {%- endif %}
    {%- endfor %}
  </chat_history>
</input>

<output_specifications>
  <format_description>A single line containing one emoji, one space, and the title text.</format_description>
  <language_rule>Must match the language of the chat_history.</language_rule>
  <length_rule_english>3-5 words</length_rule_english>
  <length_rule_other>Equivalent length (e.g., 6-10 Chinese characters)</length_rule_other>
</output_specifications>

<examples>
  <example name="English Example 1">📉 Stock Market Trends</example>
  <example name="English Example 2">🔧 Tauri Command Usage</example>
  <example name="Chinese Example 1">📜 OpenAPI 的作用</example>
  <example name="Chinese Example 2">📡 WebRTC 连接建立过程</example>
</examples>

<final_instruction>
  Based *only* on the chat history provided in the \`<input>\` section, generate the title according to all the rules and examples specified above. Output *only* the formatted title.
</final_instruction>
`

const DialogContent = `# {{ title }}
{%- for content in contents %}
{%- if content.type == 'user-message' %}

**User:**
{{ content.text }}
{%- elsif content.type == 'assistant-message' %}

**Assistant:**
{{ content.text }}
{%- endif %}
{%- endfor %}`

const PluginsPrompt = `<plugins>
{%- for plugin in plugins %}
<plugin id="{{ plugin.id }}">
{%- if plugin.prompt %}
<plugin_prompt>
{{ plugin.prompt }}
</plugin_prompt>
{%- endif %}
</plugin>
{%- endfor %}
</plugins>
`

const AssistantDefaultPrompt = `{%- if _rolePrompt %}
<role_prompt>
{{ _rolePrompt }}
</role_prompt>
{%- endif %}

{{ _pluginsPrompt }}
`

const { t } = i18n.global

const DefaultWsIndexContent = t('templates.defaultWsIndexContent')

const ExtractArtifactSchema = Object({
  thinking: String({
    description:
      '在你判断助手回答中是否有适合提取为 Artifact 的独立内容的过程中，你思考的过程。',
  }),
  found: Boolean({
    description: '是否有适合提取为 Artifact 的独立内容',
  }),
  regex: Optional(
    String({
      description:
        '用于提取 Artifacts 的 JS 正则表达式字符串，需恰好匹配整个 Artifact。Artifacts 很长，可用 `[\\s\\S]*` 匹配中间任意内容。如果 Artifact 代码块，请**不要**包含开头的 "\`\`\`" 标记。',
    })
  ),
  name: Optional(
    String({
      description:
        '根据 Artifact 内容为 Artifact 命名。像文件名那样带后缀。命名格式需符合对应语言代码的文件命名规范。',
    })
  ),
  language: Optional(
    String({
      description:
        '内容的代码语言，用于代码高亮。示例值："markdown", "javascript", "python" 等',
    })
  ),
})
type ExtractArtifactResult = Static<typeof ExtractArtifactSchema>
const ExtractArtifactPrompt = `
<instruction>
你的任务是判断用户与 AI 助手对话记录中是否有 Artifacts，如果有则将它提取出来。

Artifacts 可以是一长段完整的代码、一篇完整的文章、报告。用户可能会复用、修改这些内容，且内容较长（>15行），因此将它们提取出来。

对于其他内容（一般的问题解答、操作步骤等）则不提取，认为未找到 Artifact。

如果没有适合提取为 Artifact 的独立内容，返回 \`found\` 为 false 即可；
如果有，请确定 Artifact 在 assistant message 中的范围，给出用于提取 Artifact 的正则表达式，以及 Artifact 的语言和命名。

如果 Artifact 是代码块，则它必须是完整的代码块，不能是代码块的一部分或者多个短代码块。不合适的情况认为没有找到 Artifact 即可。

回复为 json 格式，只回答 json 内容，不要用 "\`\`\`" 包裹。
</instruction>
<response_schema>
${JSON.stringify(ExtractArtifactSchema, null, 2)}
</response_schema>
<chat_history>
{%- for content in contents %}
{%- if content.type == 'user-message' %}
<user_message>
{{ content.text }}
</user_message>
{%- elsif content.type == 'assistant-message' %}
<assistant_message>
{{ content.text }}
</assistant_message>
{%- endif %}
{%- endfor %}
</chat_history>
`
const NameArtifactPrompt = `<instruction>
请根据该文件的内容，为该文件命名。要求：
- 文件名带后缀
- 文件名符合对应语言代码的文件命名规范，如 "hello_world.py"（下划线格式）, "hello-world.js"（连字符格式）, "HelloWorld.java"（驼峰格式） 等。
- 长度不超过 3 个单词
- 只回答文件名，不要回答任何其他内容。
</instruction>
<file_content {%- if lang %} lang="{{ lang }}"{%- endif %}>
{{ content }}
</file_content>
`

const ExampleWsIndexContent = DefaultWsIndexContent

export {
  GenDialogTitle,
  DialogContent,
  PluginsPrompt,
  AssistantDefaultPrompt,
  DefaultWsIndexContent,
  ExampleWsIndexContent,
  ExtractArtifactPrompt,
  ExtractArtifactSchema,
  NameArtifactPrompt,
}

export type { ExtractArtifactResult }
