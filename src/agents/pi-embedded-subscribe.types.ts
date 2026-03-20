import type { AgentSession } from "@mariozechner/pi-coding-agent";
import type { ReasoningLevel, VerboseLevel } from "../auto-reply/thinking.js";
import type { OpenClawConfig } from "../config/types.openclaw.js";
import type { HookRunner } from "../plugins/hooks.js";
import type { BlockReplyChunking } from "./pi-embedded-block-chunker.js";
import type { BlockReplyPayload } from "./pi-embedded-payloads.js";

export type ToolResultFormat = "markdown" | "plain";

export type SubscribeEmbeddedPiSessionProfileAttrs = Record<string, string | number | boolean>;

export type SubscribeEmbeddedPiSessionProfileSpanHandle = {
  end: (status?: "ok" | "error", attrs?: SubscribeEmbeddedPiSessionProfileAttrs) => void;
  setAttr: (key: string, value: string | number | boolean | undefined) => void;
  setDetail: (key: string, value: unknown) => void;
};

export type SubscribeEmbeddedPiSessionProfileSink = {
  event: (name: string, attrs?: SubscribeEmbeddedPiSessionProfileAttrs) => void;
  startSpan: (
    name: string,
    attrs?: SubscribeEmbeddedPiSessionProfileAttrs,
  ) => SubscribeEmbeddedPiSessionProfileSpanHandle;
};

export type SubscribeEmbeddedPiSessionParams = {
  session: AgentSession;
  runId: string;
  profile?: SubscribeEmbeddedPiSessionProfileSink;
  hookRunner?: HookRunner;
  verboseLevel?: VerboseLevel;
  reasoningMode?: ReasoningLevel;
  toolResultFormat?: ToolResultFormat;
  shouldEmitToolResult?: () => boolean;
  shouldEmitToolOutput?: () => boolean;
  onToolResult?: (payload: { text?: string; mediaUrls?: string[] }) => void | Promise<void>;
  onReasoningStream?: (payload: { text?: string; mediaUrls?: string[] }) => void | Promise<void>;
  /** Called when a thinking/reasoning block ends (</think> tag processed). */
  onReasoningEnd?: () => void | Promise<void>;
  onBlockReply?: (payload: BlockReplyPayload) => void | Promise<void>;
  /** Flush pending block replies (e.g., before tool execution to preserve message boundaries). */
  onBlockReplyFlush?: () => void | Promise<void>;
  blockReplyBreak?: "text_end" | "message_end";
  blockReplyChunking?: BlockReplyChunking;
  onPartialReply?: (payload: { text?: string; mediaUrls?: string[] }) => void | Promise<void>;
  onAssistantMessageStart?: () => void | Promise<void>;
  onAgentEvent?: (evt: { stream: string; data: Record<string, unknown> }) => void | Promise<void>;
  enforceFinalTag?: boolean;
  config?: OpenClawConfig;
  sessionKey?: string;
  /** Ephemeral session UUID — regenerated on /new and /reset. */
  sessionId?: string;
  /** Agent identity for hook context — resolved from session config in attempt.ts. */
  agentId?: string;
};

export type { BlockReplyChunking } from "./pi-embedded-block-chunker.js";
