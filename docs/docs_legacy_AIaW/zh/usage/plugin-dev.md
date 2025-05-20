# 插件配置与开发

确保你已经了解[插件系统](plugins)的内容。

如果你想要添加一个自定义的新插件，就需要编写插件配置文件，这个文件是 JSON 格式的，一般称其为 `manifest`。

AIaW 支持几种不同类型的插件，它们的配置文件写法也不同。先从支持最为完善的 Gradio 类型插件讲起。

## Gradio 插件

[Gradio](https://www.gradio.app/) 是一个基于 python 的应用程序开发框架。使用它可以快速地开发简单的应用，HuggingFace 上的各种 [Spaces](https://huggingface.co/spaces) 就是最常见的例子。

Gradio 应用在提供简单的界面的同时，也提供了 API。AIaW 的 Gradio 类型插件就是通过 API 调用 Gradio 应用来实现各种功能的。

使用 Gradio 开发插件有以下的好处：

- 插件本身就是一个 Gradio 应用，可以单独使用，也方便测试
- python 简单易学，生态丰富，同时与 AI 联系紧密
- Gradio 插件支持多模态的调用结果
- Gradio 应用易于调用其他 AI 模型
- Gradio 应用可以免费托管在 HF Spaces
- Gradio 应用生态丰富，如果 HF Spaces 有现成的满足功能的应用，可以直接将其配置为插件而无需开发

关于 Gradio 应用的开发，请参考 [Gradio](https://www.gradio.app/) 的文档。这里只讲插件的配置。

下面以内置的「图像生成: FLUX」插件为例，介绍 Gradio 插件的配置文件格式：

::: code-group

```json [配置文件]
{
  "id": "hf-000000000000000000000001",
  "title": "图像生成: FLUX",
  "description": "让 AI 调用 FLUX 模型生成图像。通过 🤗 Spaces 调用，因此是免费的",
  "baseUrl": "https://black-forest-labs-flux-1-schnell.hf.space",
  "avatar": {
    "type": "icon",
    "icon": "sym_o_palette",
    "hue": 80
  },
  "endpoints": [
    /* 省略，稍后具体介绍 */
  ],
  "noRoundtrip": true
}
```

```typescript [TS 类型定义]
interface GradioPluginManifest {
  id: string
  title: string
  description: string
  prompt?: string
  promptVars?: PromptVar[]
  baseUrl: string
  avatar: Avatar
  endpoints: GradioManifestEndpoint[]
  noRoundtrip?: boolean
  author?: string
  homepage?: string
}
```

:::

- `id`: 插件的 ID；每个插件的 ID 必须不同
- `title`: 插件的显示名称
- `description`: 对用户展示的插件描述；此描述不会输入给 AI
- `prompt`: 可选；[插件的提示词](plugins#提示词)。在提示词中可以使用[提示词变量](#promptvars)
- `promptVars`: 可选；提示词变量；[具体说明](#promptvars)
- `avatar`: 插件的图标；[具体说明](#avatar)
- `endpoints`: 插件的接口定义；工具调用/文件解析器/信息获取 都定义在此处；[具体说明](#endpoints)
- `baseURL`: Gradio 应用的地址。对于托管在 HF Spaces 的 Gradio 应用，有两种写法：

  - 路径：如 `black-forest-labs/FLUX.1-schnell`
  - 链接：如 `https://black-forest-labs-flux-1-schnell.hf.space`

  这两种格式都可以。不过，由于中国大陆屏蔽了 HuggingFace 主站，但没有屏蔽 `*.hf.space`，我们建议**始终使用后一种写法**（即使用链接），以避免中国大陆的用户无法调用插件。通过观察两种格式不难发现，由路径简单改写即可得到对应的链接。

- `noRoundtrip`: 可选；默认情况下，调用工具之后，会携带调用结果再次调用LLM，以根据调用结果生成回答。不过由于这是图像生成插件，生成图像后无需助手继续回答，故将其设置为 `true` 以禁用此行为。
- `author`: 可选；插件的作者
- `homepage`: 可选；插件/作者的主页

### avatar

`avatar` 属性指定了插件的默认图标；支持不同类型的图标

::: code-group

```json [示例：图标]
{
  "type": "icon",
  "icon": "sym_o_palette",
  "hue": 80
}
```

```json [示例：文字]
{
  "type": "text",
  "text": "🍉"
}
```

```json [示例：图片链接]
{
  "type": "url",
  "url": "https://url.to.my/image.avif"
}
```

```typescript [TS 类型定义]
interface TextAvatar {
  type: 'text'
  text: string
  hue?: number
}
interface UrlAvatar {
  type: 'url'
  url: string
  hue?: number
}
interface IconAvatar {
  type: 'icon'
  icon: string
  hue?: number
}
type Avatar = TextAvatar | UrlAvatar | IconAvatar
```

:::

对于 `icon` 类型的图标，可在 [Material Symbols](https://fonts.google.com/icons) 选取图标，将图标名称写为下划线格式，并添加 `sym_o_` 前缀。如名称为 `Photo Camera` 的图标，`icon` 属性值为 `sym_o_photo_camera`。

::: info 图标前缀
图标前缀表示所使用的图标集，AIaW 使用的是 Material Symbols Outlined，于是前缀是 `sym_o_`
:::

可添加 `hue` 属性显示背景色；可在[设置页面](https://aiaw.app/settings#ui)的主题色对话框选取颜色，得到 hue 值；不填则没有背景

### endpoints

`endpoints` 定义了插件可调用的接口。Gradio 类型插件调用的是 Gradio 应用的接口。在 HF Space 页面的下方点击「通过 API 使用」，即可看到该应用的接口和参数。

`endpoint` 可定义为以下三种类型：

- `tool`: 工具调用
- `fileparser`: 文件解析器
- `info`: 信息获取

「图像生成: FLUX」插件只定义了一个工具调用接口：

::: code-group

```json [示例值]
[
  {
    "type": "tool",
    "name": "image_generation",
    "description": "Use this tool to generate images based on a prompt.",
    "prompt": "Use this tool to generate images based on a prompt.",
    "path": "/infer",
    "inputs": [
      {
        "name": "prompt",
        "description": "A prompt to generate an image from",
        "paramType": "required",
        "type": "str"
      },
      {
        "name": "seed",
        "paramType": "fixed",
        "value": 0,
        "type": "float"
      },
      {
        "name": "randomize_seed",
        "paramType": "fixed",
        "value": true,
        "type": "bool"
      },
      {
        "name": "width",
        "description": "numeric value between 256 and 2048",
        "paramType": "optional",
        "default": 1024,
        "type": "float"
      },
      {
        "name": "height",
        "description": "numeric value between 256 and 2048",
        "paramType": "optional",
        "default": 1024,
        "type": "float"
      },
      {
        "name": "num_inference_steps",
        "paramType": "fixed",
        "value": 4,
        "type": "float"
      }
    ],
    "outputIdxs": [0],
    "showComponents": ["image"]
  }
]
```

```typescript [TS 类型定义]
interface GradioManifestFileparser {
  type: 'fileparser'
  name: string
  description: string
  path: string
  inputs: GradioFileparserInput[]
  outputIdxs: number[]
}
interface GradioManifestTool {
  type: 'tool'
  name: string
  description: string
  prompt: string
  path: string
  inputs: GradioApiInput[]
  showComponents?: string[]
  outputIdxs: number[]
}
interface GradioManifestInfo {
  type: 'info'
  name: string
  description: string
  path: string
  inputs: GradioApiInput[]
  outputIdxs: number[]
}
type GradioManifestEndpoint =
  | GradioManifestFileparser
  | GradioManifestTool
  | GradioManifestInfo
```

:::

#### 工具调用

对于工具（`tool`）类型的 `endpoint`，有以下属性：

- `type`: 值为 `tool`，标明是工具类型
- `name`: 名称
- `description`: 向用户展示的工具的描述
- `prompt`: 向 AI 展示的工具的描述/提示词
- `path`: 接口的路径，对应 Gradio 应用的接口的 `api_name`；常见值为 `/predict`、`/infer` 等
- `inputs`: 定义接口的输入参数；[具体说明](#inputs)
- `outputIdxs`: 选取 Gradio 接口返回值的索引数组；如，值为 `[0]`，则仅选取返回值中索引为 `0` 的一项（即第一项）作为工具调用结果数组的唯一一项。它是一个数组，意味着如果接口有多个返回值的话，你可以选取多项作为调用结果。
- `showComponents`: 可选；定义调用结果的每一项展示给用户所用的组件。可用的组件有：

  - `textbox`: 用于展示文本；
  - `markdown`: 用于展示 markdown 格式文本
  - `image`: 用于展示图片
  - `audio`: 用于播放音频
  - `json`: 用于展示 json
  - `code`: 用于展示代码
  - `$none`: 不展示

  上方示例的值为 `["image"]`，因为调用结果只有一个图片，使用 `image` 组件将其展示给用户。如果不填 `showComponents`，则不会展示调用结果

##### inputs

`inputs` 定义了接口的输入参数

::: code-group

```json [示例值]
[
  {
    "name": "prompt",
    "description": "A prompt to generate an image from",
    "paramType": "required",
    "type": "str"
  },
  {
    "name": "seed",
    "paramType": "fixed",
    "value": 0,
    "type": "float"
  },
  {
    "name": "randomize_seed",
    "paramType": "fixed",
    "value": true,
    "type": "bool"
  },
  {
    "name": "width",
    "description": "numeric value between 256 and 2048",
    "paramType": "optional",
    "default": 1024,
    "type": "float"
  },
  {
    "name": "height",
    "description": "numeric value between 256 and 2048",
    "paramType": "optional",
    "default": 1024,
    "type": "float"
  },
  {
    "name": "num_inference_steps",
    "paramType": "fixed",
    "value": 4,
    "type": "float"
  }
]
```

```typescript [TS 类型定义]
interface GradioFixedInput {
  name: string
  paramType: 'fixed'
  type: string
  value
  description?: string
}
interface GradioOptionalInput {
  name: string
  description?: string
  paramType: 'optional'
  type: string
  default
}
interface GradioRequiredInput {
  name: string
  description?: string
  paramType: 'required'
  type: string
}
type GradioApiInput =
  | GradioFixedInput
  | GradioOptionalInput
  | GradioRequiredInput
```

:::

- `name`: Gradio 应用接口中该参数的名称
- `paramType`: 参数类型；有以下类型：
  - `required`: 要求模型调用时必须给出此参数的值
  - `fixed`: 将参数的值固定为 `value` 属性的值，模型无法改变，但用户可在插件设置中更改此固定值
  - `optional`: 定义为可选值，若模型不提供参数值，则默认为 `default` 属性的值；用户同样可以修改 `default` 的值
- `description`: 参数的描述；对于 `required`、`optional` 类型，会提供给模型；对于 `fixed`、`optional` 类型，用户在插件设置页面能看到
- `type`: 参数的数据类型。支持的类型有：`str`, `float`, `int`, `bool`

#### 文件解析器

`endpoints` 的元素也可以是文件解析器（`fileparser`）；以「语音识别：Whisper」插件的文件解析器为例：

::: code-group

```json [示例值]
{
  "type": "fileparser",
  "name": "transcribe",
  "description": "将语音转换为文字",
  "path": "/transcribe",
  "inputs": [
    {
      "name": "audio",
      "type": "file",
      "mimeTypes": ["audio/*"],
      "paramType": "file"
    },
    {
      "name": "task",
      "description": "任务类型",
      "type": "str",
      "paramType": "fixed",
      "value": "transcribe"
    }
  ],
  "outputIdxs": [0]
}
```

```typescript [TS 类型定义]
interface GradioFileInput {
  name: string
  paramType: 'file'
  mimeTypes: string[]
}
interface GradioRangeInput {
  name: string
  paramType: 'range'
  label?: string
  hint?: string
  mask?: string
}
interface GradioFixedInput {
  name: string
  paramType: 'fixed'
  type: string
  value
  description?: string
}
type GradioFileparserInput =
  | GradioFileInput
  | GradioRangeInput
  | GradioFixedInput
interface GradioManifestFileparser {
  type: 'fileparser'
  name: string
  description: string
  path: string
  inputs: GradioFileparserInput[]
  outputIdxs: number[]
}
```

:::

它有以下属性：

- `type`: 值为 `fileparser`，标明是文件解析器
- `name`: 名称
- `description`: 向用户展示的文件解析器的描述
- `path`: 接口的路径，对应 Gradio 应用的接口的 `api_name`；常见值为 `/predict`、`/infer` 等
- `inputs`: 定义接口的输入参数；具体说明详见下方
- `outputIdxs`: 选取 Gradio 接口返回值的索引数组；如，值为 `[0]`，则仅选取返回值中索引为 `0` 的一项（即第一项）作为文件解析结果数组的唯一一项。它是一个数组，意味着如果接口有多个返回值的话，你可以选取多项作为解析结果。

文件解析器的 `inputs` 的类型有：`file`、`range` 和 `fixed`。

文件解析器必须有且只能有一个 `file` 类型的输入，它是要解析的文件。

它有以下属性：

- `name`: Gradio 应用接口中该参数的名称
- `paramType`: 值为 `file`
- `mimeTypes`: 默认接受文件的类型；值为 MIME Type 的数组，只要有一项与待解析文件的 MIME Type 匹配，就会将此解析器作为解析选项之一。

文件解析器也可以有 `fixed` 类型的输入，与工具调用的 `fixed` 输入一样。

此外，还可以添加一个 `range` 类型的参数，使得用户在解析文件时可以填写此额外参数。可将此参数用作让用户指定解析范围（如：页码范围、时长范围等）。此参数最多有一个且为字符串类型。有以下属性：

- `name`: Gradio 应用接口中该参数的名称
- `paramType`: 值为 `range`
- `label`: 可选；输入框的标签
- `hint`: 可选；输入框的提示（placeholder）
- `mask`: 可选；用于固定格式的输入，规则详见 Quasar 文档：[Mask](https://quasar.dev/vue-components/input#mask)

#### 信息获取

信息获取（`info`）接口用于向模型提供信息。它和工具调用的不同之处在于，调用时的输入参数值是预定义好的而不是模型提供的。

信息获取需要结合 `prompt` 使用。它的调用结果将作为一个提示词变量的值，然后在插件的 `prompt` 中可以使用这个变量，由此通过提示词向模型提供信息。

它是在每次生成前调用的，调用结果不会缓存。

```typescript [TS 类型定义]
interface GradioManifestInfo {
  type: 'info'
  name: string
  description: string
  path: string
  inputs: GradioApiInput[]
  outputIdxs: number[]
}
```

- `type`: 值为 `info`
- `name`: 名称；在 `prompt` 中使用 `infos.{name}` 来访问变量
- `description`: 在插件功能页面展示给用户的描述
- `inputs`: 输入参数，和 `tool` 参数的格式一样，只是变成了由用户在插件功能页面输入参数值而不是模型提供；用户仍然可以在插件设置页面被更改 `fixed` 参数的值和 `optional` 参数的默认值。
- `outputIdxs`: 选取调用结果的索引数组；

`info` 的调用结果也是一个数组，数组元素的格式为：

```typescript
interface ApiResultItem {
  type: 'text' | 'file'
  contentText?: string
  contentBuffer?: ArrayBuffer
  name?: string
  mimeType?: string
}
```

在 `prompt` 中可以使用 `infos.info_a[0].contentText` 类似格式访问调用结果。

### promptVars

通过 `promptVars` 可定义插件的变量，变量可在插件的 `prompt` 中使用；变量的值可在插件功能页面更改。使用变量可以允许用户对插件的提示词进行微调。

::: code-group

```json [示例值]
[
  {
    "id": "displayWidth",
    "name": "displayWidth",
    "label": "显示大小",
    "type": "number",
    "default": 100
  }
]
```

```typescript [TS 类型定义]
type PromptVarValue = string | number | boolean | string[]
interface PromptVar {
  id: string
  name: string
  type: 'text' | 'number' | 'select' | 'multi-select' | 'toggle'
  label?: string
  options?: string[]
  default?: PromptVarValue
}
```

:::

此外，还有几个「通用提示词变量」，可以在插件的 `prompt` 中使用：

| 变量名          | 内容                          | 示例值                                                                                        |
| --------------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| \_currentTime   | 当前时间                      | "Tue Dec 10 2024 17:22:11 GMT+0800 (中国标准时间)"                                            |
| \_userLanguage  | 用户语言 `navigator.language` | "zh-CN"                                                                                       |
| \_workspaceId   | 工作区 ID                     | "1ielm0e6n464itr2ps"                                                                          |
| \_workspaceName | 工作区名称                    | "示例工作区"                                                                                  |
| \_assistantId   | 助手 ID                       | "1ielm0e6n464itssd3"                                                                          |
| \_assistantName | 助手名称                      | "默认助手"                                                                                    |
| \_dialogId      | 对话 ID                       | "1ielm5fg6464ittksm"                                                                          |
| \_modelId       | 模型 ID                       | "gpt-4o"                                                                                      |
| \_isDarkMode    | 当前是否为深色模式            | false                                                                                         |
| \_platform      | 根据用户使用的平台信息        | quasar 的 Platform 对象。详见[这里](https://quasar.dev/options/platform-detection#properties) |

### 仅提示词插件

Gradio 类型插件不一定都要调用 Gradio 接口，仅包含提示词的 Gradio 类型插件也是可以的。

具体来说，`endpoints` 可以为空数组，然后设置 `prompt`，也可以添加 `promptVars`。

## LobeChat 插件

AIaW 兼容部分 LobeChat 插件，具体来说：

- 支持 `default` 和 `markdown` 类型插件，不支持 `standalone` 类型。
- 不支持 openapi 插件
- 不支持 `ui` 属性

对于支持的插件，你可以直接在插件市场添加其 Manifest。

LobeChat 插件的开发指南，请参考 [LobeChat 的文档](https://lobehub.com/zh/docs/usage/plugins/development)。

## 发布插件

在插件市场手动添加 Manifest 就可以使用自定义插件。你也可以将插件发布，这样其他人也可以直接在插件市场安装。

要发布插件，请将插件信息和 Manifest 添加到源码的 `/public/plugins.json` 中，然后提交 PR。

建议直接将 manifest 写在文件中，因为使用链接的话，manifest 是可变的。我们更有可能怀疑其安全性而拒绝 PR。
