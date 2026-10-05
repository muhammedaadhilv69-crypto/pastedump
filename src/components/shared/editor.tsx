"use client"

import * as React from "react"
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from "@codemirror/autocomplete"
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands"
import { languages } from "@codemirror/language-data"
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentUnit,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language"
import { Annotation, Compartment, EditorState } from "@codemirror/state"
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view"
import {
  Braces,
  Code2,
  Eye,
  FileCode2,
  FileText,
  PencilLine,
  WrapText,
} from "lucide-react"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type LanguageOption = {
  id: string
  label: string
  shiki: string | null
  codeMirrorAliases: readonly string[]
  group: string
}

const LANGUAGE_OPTIONS = [
  { id: "text", label: "Plain text", shiki: null, codeMirrorAliases: [], group: "Popular" },
  { id: "javascript", label: "JavaScript", shiki: "javascript", codeMirrorAliases: ["javascript"], group: "Popular" },
  { id: "typescript", label: "TypeScript", shiki: "typescript", codeMirrorAliases: ["typescript"], group: "Popular" },
  { id: "python", label: "Python", shiki: "python", codeMirrorAliases: ["python"], group: "Popular" },
  { id: "java", label: "Java", shiki: "java", codeMirrorAliases: ["java"], group: "Popular" },
  { id: "go", label: "Go", shiki: "go", codeMirrorAliases: ["go"], group: "Popular" },
  { id: "rust", label: "Rust", shiki: "rust", codeMirrorAliases: ["rust"], group: "Popular" },
  { id: "c", label: "C", shiki: "c", codeMirrorAliases: ["c"], group: "Popular" },
  { id: "cpp", label: "C++", shiki: "cpp", codeMirrorAliases: ["c++"], group: "Popular" },
  { id: "csharp", label: "C#", shiki: "csharp", codeMirrorAliases: ["c#"], group: "Popular" },
  { id: "html", label: "HTML", shiki: "html", codeMirrorAliases: ["html"], group: "Web" },
  { id: "css", label: "CSS", shiki: "css", codeMirrorAliases: ["css"], group: "Web" },
  { id: "jsx", label: "JSX", shiki: "jsx", codeMirrorAliases: ["jsx"], group: "Web" },
  { id: "tsx", label: "TSX", shiki: "tsx", codeMirrorAliases: ["tsx"], group: "Web" },
  { id: "json", label: "JSON", shiki: "json", codeMirrorAliases: ["json"], group: "Web" },
  { id: "vue", label: "Vue", shiki: "vue", codeMirrorAliases: ["vue"], group: "Web" },
  { id: "svelte", label: "Svelte", shiki: "svelte", codeMirrorAliases: ["svelte"], group: "Web" },
  { id: "scss", label: "SCSS", shiki: "scss", codeMirrorAliases: ["scss"], group: "Web" },
  { id: "sass", label: "Sass", shiki: "sass", codeMirrorAliases: ["sass"], group: "Web" },
  { id: "less", label: "Less", shiki: "less", codeMirrorAliases: ["less"], group: "Web" },
  { id: "graphql", label: "GraphQL", shiki: "graphql", codeMirrorAliases: [], group: "Web" },
  { id: "php", label: "PHP", shiki: "php", codeMirrorAliases: ["php"], group: "Web" },
  { id: "ruby", label: "Ruby", shiki: "ruby", codeMirrorAliases: ["ruby"], group: "Web" },
  { id: "swift", label: "Swift", shiki: "swift", codeMirrorAliases: [], group: "Systems" },
  { id: "kotlin", label: "Kotlin", shiki: "kotlin", codeMirrorAliases: [], group: "Systems" },
  { id: "dart", label: "Dart", shiki: "dart", codeMirrorAliases: ["dart"], group: "Systems" },
  { id: "objective-c", label: "Objective-C", shiki: "objective-c", codeMirrorAliases: ["objective-c"], group: "Systems" },
  { id: "scala", label: "Scala", shiki: "scala", codeMirrorAliases: ["scala"], group: "Systems" },
  { id: "elixir", label: "Elixir", shiki: "elixir", codeMirrorAliases: [], group: "Systems" },
  { id: "clojure", label: "Clojure", shiki: "clojure", codeMirrorAliases: ["clojure"], group: "Systems" },
  { id: "haskell", label: "Haskell", shiki: "haskell", codeMirrorAliases: ["haskell"], group: "Systems" },
  { id: "ocaml", label: "OCaml", shiki: "ocaml", codeMirrorAliases: ["ocaml"], group: "Systems" },
  { id: "lua", label: "Lua", shiki: "lua", codeMirrorAliases: ["lua"], group: "Systems" },
  { id: "perl", label: "Perl", shiki: "perl", codeMirrorAliases: ["perl"], group: "Systems" },
  { id: "r", label: "R", shiki: "r", codeMirrorAliases: ["r"], group: "Data & config" },
  { id: "sql", label: "SQL", shiki: "sql", codeMirrorAliases: ["sql"], group: "Data & config" },
  { id: "yaml", label: "YAML", shiki: "yaml", codeMirrorAliases: ["yaml"], group: "Data & config" },
  { id: "toml", label: "TOML", shiki: "toml", codeMirrorAliases: ["toml"], group: "Data & config" },
  { id: "xml", label: "XML", shiki: "xml", codeMirrorAliases: ["xml"], group: "Data & config" },
  { id: "markdown", label: "Markdown", shiki: "markdown", codeMirrorAliases: ["markdown"], group: "Data & config" },
  { id: "mdx", label: "MDX", shiki: "mdx", codeMirrorAliases: [], group: "Data & config" },
  { id: "ini", label: "INI", shiki: "ini", codeMirrorAliases: ["properties files"], group: "Data & config" },
  { id: "dockerfile", label: "Dockerfile", shiki: "docker", codeMirrorAliases: ["dockerfile"], group: "Data & config" },
  { id: "make", label: "Makefile", shiki: "make", codeMirrorAliases: [], group: "Data & config" },
  { id: "bash", label: "Bash", shiki: "shellscript", codeMirrorAliases: ["shell"], group: "Other" },
  { id: "powershell", label: "PowerShell", shiki: "powershell", codeMirrorAliases: ["powershell"], group: "Other" },
  { id: "diff", label: "Diff", shiki: "diff", codeMirrorAliases: ["diff"], group: "Other" },
  { id: "ini-config", label: "Config / .env", shiki: "dotenv", codeMirrorAliases: ["properties files"], group: "Other" },
  { id: "prisma", label: "Prisma", shiki: "prisma", codeMirrorAliases: [], group: "Other" },
  { id: "terraform", label: "Terraform", shiki: "terraform", codeMirrorAliases: [], group: "Other" },
  { id: "astro", label: "Astro", shiki: "astro", codeMirrorAliases: [], group: "Other" },
  { id: "cmake", label: "CMake", shiki: "cmake", codeMirrorAliases: ["cmake"], group: "Other" },
  { id: "nginx", label: "Nginx", shiki: "nginx", codeMirrorAliases: ["nginx"], group: "Other" },
  { id: "assembly", label: "Assembly", shiki: "asm", codeMirrorAliases: [], group: "Other" },
  { id: "groovy", label: "Groovy", shiki: "groovy", codeMirrorAliases: ["groovy"], group: "Other" },
  { id: "fsharp", label: "F#", shiki: "fsharp", codeMirrorAliases: ["f#"], group: "Other" },
  { id: "vb", label: "Visual Basic", shiki: "vb", codeMirrorAliases: ["vb.net"], group: "Other" },
  { id: "julia", label: "Julia", shiki: "julia", codeMirrorAliases: [], group: "Other" },
  { id: "zig", label: "Zig", shiki: "zig", codeMirrorAliases: [], group: "Other" },
] as const satisfies readonly LanguageOption[]

export type EditorLanguage = (typeof LANGUAGE_OPTIONS)[number]["id"]

const LANGUAGE_GROUPS = [...new Set(LANGUAGE_OPTIONS.map((language) => language.group))]

const codeMirrorTheme = EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "transparent",
    color: "var(--foreground)",
    fontSize: "13px",
  },
  "&.cm-focused": { outline: "none" },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
    lineHeight: "1.8",
  },
  ".cm-content": { padding: "18px 0", caretColor: "var(--foreground)" },
  ".cm-line": { padding: "0 20px" },
  ".cm-gutters": {
    minWidth: "3.5rem",
    border: "none",
    backgroundColor: "transparent",
    color: "var(--muted-foreground)",
  },
  ".cm-gutterElement": { padding: "0 12px 0 16px" },
  ".cm-activeLine, .cm-activeLineGutter": {
    backgroundColor: "color-mix(in oklch, var(--foreground) 4%, transparent)",
  },
  ".cm-cursor": { borderLeftColor: "var(--foreground)", borderLeftWidth: "2px" },
  ".cm-selectionBackground, ::selection": {
    backgroundColor: "color-mix(in oklch, var(--primary) 18%, transparent)",
  },
  ".cm-matchingBracket": {
    backgroundColor: "color-mix(in oklch, var(--primary) 14%, transparent)",
    outline: "1px solid color-mix(in oklch, var(--primary) 28%, transparent)",
  },
})

export type EditorProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  language?: EditorLanguage
  defaultLanguage?: EditorLanguage
  onLanguageChange?: (language: EditorLanguage) => void
  wordWrap?: boolean
  defaultWordWrap?: boolean
  onWordWrapChange?: (wordWrap: boolean) => void
  ariaLabel?: string
  className?: string
}

type HighlightResult = {
  value: string
  language: EditorLanguage
  html?: string
  error?: string
}

function getLanguageDescription(option: (typeof LANGUAGE_OPTIONS)[number]) {
  const aliases = (
    option.codeMirrorAliases.length > 0
      ? option.codeMirrorAliases
      : [option.id]
  ).map((alias) => alias.toLowerCase())
  return languages.find((description) =>
    description.alias.some((alias) => aliases.includes(alias.toLowerCase()))
  )
}

const externalValueChange = Annotation.define<boolean>()

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

export function Editor({
  value,
  defaultValue = "",
  onChange,
  language,
  defaultLanguage = "javascript",
  onLanguageChange,
  wordWrap,
  defaultWordWrap = false,
  onWordWrapChange,
  ariaLabel = "Code editor",
  className,
}: EditorProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const [uncontrolledLanguage, setUncontrolledLanguage] =
    React.useState<EditorLanguage>(defaultLanguage)
  const [uncontrolledWordWrap, setUncontrolledWordWrap] =
    React.useState(defaultWordWrap)
  const [activeTab, setActiveTab] = React.useState("edit")
  const [highlightResult, setHighlightResult] =
    React.useState<HighlightResult | null>(null)
  const [languageLoadError, setLanguageLoadError] = React.useState<{
    language: EditorLanguage
    message: string
  } | null>(null)
  const editorHostRef = React.useRef<HTMLDivElement>(null)
  const editorViewRef = React.useRef<EditorView | null>(null)
  const currentValue = value ?? uncontrolledValue
  const currentLanguage = language ?? uncontrolledLanguage
  const currentWordWrap = wordWrap ?? uncontrolledWordWrap
  const selectedLanguage =
    LANGUAGE_OPTIONS.find((option) => option.id === currentLanguage) ??
    LANGUAGE_OPTIONS[0]
  const selectedLanguageDescription = getLanguageDescription(selectedLanguage)
  const matchingHighlight =
    highlightResult?.value === currentValue &&
    highlightResult.language === selectedLanguage.id
      ? highlightResult
      : null
  const isHighlighting =
    activeTab === "view" &&
    currentValue.length > 0 &&
    selectedLanguage.shiki !== null &&
    matchingHighlight === null
  const highlightError = matchingHighlight?.error ?? null
  const languageError =
    selectedLanguage.id !== "text" && !selectedLanguageDescription
      ? `CodeMirror does not have an editing mode for ${selectedLanguage.label}.`
      : languageLoadError?.language === selectedLanguage.id
        ? languageLoadError.message
        : null
  const currentValueRef = React.useRef(currentValue)
  const currentWordWrapRef = React.useRef(currentWordWrap)
  const isControlledRef = React.useRef(value !== undefined)
  const onChangeRef = React.useRef(onChange)
  const languageCompartment = React.useMemo(() => new Compartment(), [])
  const wrapCompartment = React.useMemo(() => new Compartment(), [])
  const wordWrapId = React.useId()
  const lineCount = currentValue.split("\n").length
  const characterCount = currentValue.length

  React.useEffect(() => {
    currentValueRef.current = currentValue
    currentWordWrapRef.current = currentWordWrap
    isControlledRef.current = value !== undefined
    onChangeRef.current = onChange
  }, [currentValue, currentWordWrap, onChange, value])

  const updateLanguage = React.useCallback(
    (nextLanguage: EditorLanguage) => {
      if (language === undefined) setUncontrolledLanguage(nextLanguage)
      setLanguageLoadError(null)
      onLanguageChange?.(nextLanguage)
    },
    [language, onLanguageChange]
  )

  const updateWordWrap = React.useCallback(
    (nextWordWrap: boolean) => {
      if (wordWrap === undefined) setUncontrolledWordWrap(nextWordWrap)
      onWordWrapChange?.(nextWordWrap)
    },
    [wordWrap, onWordWrapChange]
  )

  React.useEffect(() => {
    if (!editorHostRef.current) return

    const editor = new EditorView({
      parent: editorHostRef.current,
      state: EditorState.create({
        doc: currentValueRef.current,
        extensions: [
          lineNumbers(),
          foldGutter(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          indentUnit.of("  "),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          highlightActiveLine(),
          rectangularSelection(),
          crosshairCursor(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            indentWithTab,
          ]),
          languageCompartment.of([]),
          wrapCompartment.of(
            currentWordWrapRef.current ? EditorView.lineWrapping : []
          ),
          EditorView.contentAttributes.of({ "aria-label": ariaLabel }),
          codeMirrorTheme,
          EditorView.updateListener.of((update) => {
            if (
              !update.docChanged ||
              update.transactions.some((transaction) =>
                transaction.annotation(externalValueChange)
              )
            ) {
              return
            }
            const nextValue = update.state.doc.toString()
            if (!isControlledRef.current) setUncontrolledValue(nextValue)
            onChangeRef.current?.(nextValue)
          }),
        ],
      }),
    })
    editorViewRef.current = editor

    return () => {
      editor.destroy()
      editorViewRef.current = null
    }
  }, [ariaLabel, languageCompartment, wrapCompartment])

  React.useEffect(() => {
    const editor = editorViewRef.current
    if (!editor) return
    const currentDocument = editor.state.doc.toString()
    if (currentDocument === currentValue) return
    editor.dispatch({
      changes: { from: 0, to: currentDocument.length, insert: currentValue },
      annotations: externalValueChange.of(true),
    })
  }, [currentValue])

  React.useEffect(() => {
    const editor = editorViewRef.current
    if (!editor) return
    editor.dispatch({
      effects: wrapCompartment.reconfigure(
        currentWordWrap ? EditorView.lineWrapping : []
      ),
    })
  }, [currentWordWrap, wrapCompartment])

  React.useEffect(() => {
    const editor = editorViewRef.current
    if (!editor) return
    if (selectedLanguage.id === "text") {
      editor.dispatch({ effects: languageCompartment.reconfigure([]) })
      return
    }

    const description = selectedLanguageDescription
    if (!description) {
      editor.dispatch({ effects: languageCompartment.reconfigure([]) })
      return
    }

    let cancelled = false
    description
      .load()
      .then((support) => {
        if (cancelled || !editorViewRef.current) return
        editor.dispatch({
          effects: languageCompartment.reconfigure(support),
        })
        setLanguageLoadError(null)
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setLanguageLoadError({
          language: selectedLanguage.id,
          message: `Could not load the ${selectedLanguage.label} editing mode: ${getErrorMessage(error)}`,
        })
      })

    return () => {
      cancelled = true
    }
  }, [languageCompartment, selectedLanguage, selectedLanguageDescription])

  React.useEffect(() => {
    const shikiLanguage = selectedLanguage.shiki
    if (activeTab !== "view" || !currentValue || !shikiLanguage) return

    let cancelled = false

    import("shiki")
      .then(({ codeToHtml }) =>
        codeToHtml(currentValue, {
          lang: shikiLanguage,
          themes: { light: "github-light", dark: "github-dark" },
        })
      )
      .then((html) => {
        if (!cancelled) {
          setHighlightResult({
            value: currentValue,
            language: selectedLanguage.id,
            html,
          })
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setHighlightResult({
          value: currentValue,
          language: selectedLanguage.id,
          error: `Could not highlight ${selectedLanguage.label}: ${getErrorMessage(error)}`,
        })
      })

    return () => {
      cancelled = true
    }
  }, [activeTab, currentValue, selectedLanguage])

  const groupedLanguages = LANGUAGE_GROUPS.map((group) => ({
    group,
    options: LANGUAGE_OPTIONS.filter((option) => option.group === group),
  }))

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <Tabs
        defaultValue="edit"
        onValueChange={(nextTab) => setActiveTab(nextTab)}
        className="gap-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <TabsList
            variant="line"
            className="h-9 gap-1 rounded-lg bg-muted/60 p-1"
          >
            <TabsTrigger value="view" className="gap-2 px-3">
              <Eye aria-hidden="true" />
              View
            </TabsTrigger>
            <TabsTrigger value="edit" className="gap-2 px-3">
              <PencilLine aria-hidden="true" />
              Edit
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <FileCode2
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <Select
                value={selectedLanguage.id}
                onValueChange={(nextValue) => {
                  const nextLanguage = LANGUAGE_OPTIONS.find(
                    (option) => option.id === nextValue
                  )
                  if (nextLanguage) updateLanguage(nextLanguage.id)
                }}
              >
                <SelectTrigger
                  aria-label="Choose syntax highlighting language"
                  className="w-[174px] bg-background"
                >
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="max-h-[min(24rem,70vh)]"
                >
                  {groupedLanguages.map(({ group, options }) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 border-l border-border pl-3">
              <WrapText
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <label
                htmlFor={wordWrapId}
                className="cursor-pointer select-none text-sm text-muted-foreground"
              >
                Wrap
              </label>
              <Switch
                id={wordWrapId}
                aria-label="Toggle word wrap"
                checked={currentWordWrap}
                onCheckedChange={updateWordWrap}
                size="sm"
              />
            </div>
          </div>
        </div>

        <div className="h-[min(62vh,36rem)] min-h-[22rem] bg-background">
          <TabsContent
            value="edit"
            keepMounted
            className="m-0 h-full overflow-hidden data-[hidden]:hidden"
          >
            <div ref={editorHostRef} className="h-full" />
          </TabsContent>
          <TabsContent
            value="view"
            keepMounted
            className="m-0 h-full overflow-hidden data-[hidden]:hidden"
          >
            <div
              className="h-full overflow-auto px-5 py-4 font-mono text-[13px] leading-7"
              aria-busy={isHighlighting}
            >
              {highlightError && (
                <p
                  role="alert"
                  className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 font-sans text-xs text-destructive"
                >
                  {highlightError}
                </p>
              )}

              {!currentValue ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <FileText aria-hidden="true" className="size-5" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">
                      Nothing to preview yet
                    </p>
                    <p className="mt-1 font-sans text-xs text-muted-foreground">
                      Add some content in the Edit tab to see it here.
                    </p>
                  </div>
                </div>
              ) : isHighlighting ? (
                <p
                  role="status"
                  className="font-sans text-sm text-muted-foreground"
                >
                  Preparing highlighted preview…
                </p>
              ) : selectedLanguage.shiki && matchingHighlight?.html ? (
                <div
                        className={cn(
                          "[&_pre.shiki]:!m-0 [&_pre.shiki]:!bg-transparent [&_pre.shiki]:!p-0 [&_pre.shiki]:font-mono [&_pre.shiki]:text-[13px] [&_pre.shiki]:leading-7 [&_code]:font-[inherit] [&_.shiki]:min-w-max",
                          currentWordWrap
                            ? "[&_pre.shiki]:!min-w-0 [&_pre.shiki]:!whitespace-pre-wrap [&_pre.shiki]:break-words"
                            : "[&_pre.shiki]:!whitespace-pre"
                        )}
                        dangerouslySetInnerHTML={{ __html: matchingHighlight.html }}
                      />
              ) : (
                <pre
                  className={cn(
                    "m-0 font-mono text-[13px] leading-7",
                    currentWordWrap
                      ? "break-words whitespace-pre-wrap"
                      : "whitespace-pre"
                  )}
                >
                  {currentValue}
                </pre>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span>Ready</span>
          {languageError && (
            <span role="status" className="break-words text-destructive">
              {languageError}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="h-5 gap-1.5 font-normal">
            <Braces aria-hidden="true" />
            {selectedLanguage.label}
          </Badge>
          <span>{lineCount} lines</span>
          <span>{characterCount.toLocaleString()} chars</span>
          <Code2 aria-hidden="true" className="size-4" />
        </div>
      </div>
    </div>
  )
}