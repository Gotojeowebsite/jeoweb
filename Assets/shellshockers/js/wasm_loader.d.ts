/* tslint:disable */
/* eslint-disable */
export function start(): void;
export function process(input: Uint8Array): void;
export function validate(input: string): string;
export function set_mouse_params(speed: number, invert: number, fov: number, scoped: boolean, unique_id: string): void;
export function reset_yaw_pitch(): void;
export function get_yaw_pitch(): any;
export function poll_gamepad(gp_idx: number, deadzone: number, speed: number, scoped: boolean, invert: number, players: any, camera: any, me_id: number, me_team: number): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly start: () => void;
  readonly process: (a: number, b: number) => void;
  readonly validate: (a: number, b: number) => [number, number];
  readonly set_mouse_params: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly reset_yaw_pitch: () => void;
  readonly get_yaw_pitch: () => any;
  readonly poll_gamepad: (a: number, b: number, c: number, d: number, e: number, f: any, g: any, h: number, i: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly closure9_externref_shim: (a: number, b: number, c: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
