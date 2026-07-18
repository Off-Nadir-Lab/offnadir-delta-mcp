/**
 * Static introspection catalog for the Off-Nadir Delta stdio MCP proxy.
 *
 * These tool / resource / prompt definitions mirror the live remote MCP server
 * (https://offnadir-delta.com/api/v1/mcp) so that `tools/list`, `resources/list`,
 * and `prompts/list` answer instantly and WITHOUT credentials — this is what
 * lets registries (e.g. Glama) introspect the server in a bare container.
 *
 * Actual `tools/call` / `resources/read` / `prompts/get` requests are forwarded
 * to the remote server with the caller's OFFNADIR_DELTA_API_KEY (see index.ts).
 *
 * Keep in sync with the source of truth: src/app/api/v1/mcp/route.ts in the
 * Off-Nadir Delta app. Token costs and enums are inlined from that surface.
 */

const DELTA_CATEGORIES = [
  'kinetic',
  'armed_conflict',
  'maritime',
  'natural_disaster',
  'infrastructure',
  'aviation',
  'humanitarian',
  'protest',
  'diplomacy',
  'other',
] as const;

const MARKET_IMPACTS = [
  'oil',
  'natural_gas',
  'grain',
  'shipping',
  'defense',
  'metals',
  'semiconductors',
  'fx',
  'equities',
] as const;

const IMAGERY_COLLECTIONS = [
  'sentinel-1-grd',
  'sentinel-1-rtc',
  'sentinel-2-l2a',
  'OPERA_L2_RTC-S1_V1',
] as const;

const SIGNALS_MAX_DAYS = 30;
const SIGNALS_MAX_LIMIT = 500;

const BBOX = {
  type: 'array',
  items: { type: 'number' },
  minItems: 4,
  maxItems: 4,
} as const;

export const TOOLS = [
  {
    name: 'query_signals',
    annotations: { readOnlyHint: true },
    description:
      'Query geolocated world event signals (Delta Signals: geopolitical, security, disaster, and ' +
      'infrastructure events distilled from global news media, AI-enriched with severity/GEOINT scores ' +
      'and satellite-collection recommendations). Filter by bounding box, date window, and category. ' +
      "Costs 3 token(s) per call, charged to the API key owner's balance.",
    inputSchema: {
      type: 'object',
      properties: {
        bbox: { ...BBOX, description: 'Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Omit for worldwide.' },
        date: { type: 'string', description: 'Window end date, YYYY-MM-DD (UTC). Defaults to today.' },
        days: { type: 'integer', minimum: 1, maximum: SIGNALS_MAX_DAYS, description: 'Window length in days ending on `date`. Defaults to 1.' },
        categories: { type: 'array', items: { type: 'string', enum: [...DELTA_CATEGORIES] }, description: 'Restrict to these categories. Omit for all.' },
        markets: {
          type: 'array',
          items: { type: 'string', enum: [...MARKET_IMPACTS] },
          description:
            'Restrict to signals AI-tagged as exposing these financial markets via a direct ' +
            'physical/supply channel (informational only, not investment advice). Omit for all.',
        },
        limit: { type: 'integer', minimum: 1, maximum: SIGNALS_MAX_LIMIT, description: 'Maximum rows per page. Defaults to 100.' },
        cursor: { type: 'string', description: "Opaque pagination cursor from a previous response's meta.next_cursor." },
        minSeverity: { type: 'number', minimum: 0, maximum: 10, description: 'Keep only signals with severity_score >= this (0-10).' },
        escalating: { type: 'boolean', description: 'Keep only signals whose escalation_trend is "escalating".' },
        sort: { type: 'string', enum: ['severity', 'recent', 'sources', 'geoint'], description: "Result ordering. Omit for the feed's default ranking. \"geoint\" ranks by GEOINT spatial-collection value so imageable, high-value events rise and non-observable news noise sinks." },
        updatedSince: { type: 'string', description: 'Differential fetch: only signals (re)enriched at/after this ISO 8601 timestamp. Ignores the date window. Response signals carry last_updated_at.' },
        createdSince: { type: 'string', description: 'Differential fetch: only signals first enriched at/after this ISO 8601 timestamp.' },
        observability: { type: 'string', enum: ['observable', 'not-observable'], description: 'Keep only signals with this satellite observability — whether a physical mark is imageable at all (intelligence.satellite_observability).' },
        openData: { type: 'string', enum: ['sufficient', 'commercial-recommended', 'not-applicable'], description: 'Keep only signals with this open-data sufficiency — free imagery is enough vs commercial tasking recommended (intelligence.open_data_sufficiency).' },
        minInformationGain: { type: 'number', minimum: 0, maximum: 1, description: 'Keep only signals whose intelligence.expected_information_gain >= this (0-1).' },
        responseFormat: { type: 'string', enum: ['concise', 'detailed'], description: 'Per-signal field detail. "concise" (default) returns key decision + GEOINT fields; "detailed" returns the full Signal object.' },
      },
    },
  },
  {
    name: 'query_stats',
    annotations: { readOnlyHint: true },
    description:
      'Aggregate statistics over the signal corpus — total event count plus per-category and per-day ' +
      'breakdown (trend) for a bounding box and date window. Cheaper than query_signals (returns ' +
      'roll-ups, not rows). Costs 1 token(s) per call.',
    inputSchema: {
      type: 'object',
      properties: {
        bbox: { ...BBOX, description: 'Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Omit for worldwide.' },
        date: { type: 'string', description: 'Window end date, YYYY-MM-DD (UTC). Defaults to today.' },
        days: { type: 'integer', minimum: 1, maximum: SIGNALS_MAX_DAYS, description: 'Window length in days. Defaults to 1.' },
        categories: { type: 'array', items: { type: 'string', enum: [...DELTA_CATEGORIES] }, description: 'Restrict to these categories. Omit for all.' },
      },
    },
  },
  {
    name: 'query_hotspots',
    annotations: { readOnlyHint: true },
    description:
      'Geographic hotspots — signal density grid-binned into cells, ranked by event count, each with ' +
      'peak severity and the categories present. Use to find WHERE activity is concentrating. ' +
      'Costs 1 token(s) per call.',
    inputSchema: {
      type: 'object',
      properties: {
        bbox: { ...BBOX, description: 'Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Omit for worldwide.' },
        date: { type: 'string', description: 'Window end date, YYYY-MM-DD (UTC). Defaults to today.' },
        days: { type: 'integer', minimum: 1, maximum: SIGNALS_MAX_DAYS, description: 'Window length in days. Defaults to 1.' },
        categories: { type: 'array', items: { type: 'string', enum: [...DELTA_CATEGORIES] }, description: 'Restrict to these categories. Omit for all.' },
        precision: { type: 'number', minimum: 0.1, maximum: 5, description: 'Grid cell size in decimal degrees. Defaults to 1.' },
        minSeverity: { type: 'number', minimum: 0, maximum: 10, description: 'Keep only points with severity_score >= this.' },
        limit: { type: 'integer', minimum: 1, maximum: SIGNALS_MAX_LIMIT, description: 'Max source points sampled before grid-binning — NOT the number of cells returned. Defaults to 500 (the max). Lower values sample fewer events and fragment clusters (each cell trends toward count 1), so leave at the default for a representative density map.' },
      },
    },
  },
  {
    name: 'get_world_brief',
    annotations: { readOnlyHint: true },
    description:
      "Fetch the Daily World Brief — an AI-synthesized OSINT/GEOINT digest of the previous UTC day's " +
      'worldwide event signals (headline, executive summary, top developments with why-it-matters and ' +
      'what-to-watch, per-theme roll-up, ranked signals). Free of token charges.',
    inputSchema: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'Brief date, YYYY-MM-DD (UTC). Defaults to the latest available.' },
      },
    },
  },
  {
    name: 'get_usage',
    annotations: { readOnlyHint: true },
    description:
      "Check the calling key's remaining token balance and plan capabilities — monthly allocation, " +
      'tokens used this period, tokens remaining, and whether the plan includes AI tools over the API ' +
      '(assess_signal / ask_analyst). Use this to pre-flight a metered call: decide whether enough ' +
      'balance is left before spending. Free of token charges.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'search_imagery',
    annotations: { readOnlyHint: true },
    description:
      'Search the satellite imagery catalog (Sentinel-1/2, OPERA RTC-S1) for scenes over an area and ' +
      'date window — the natural follow-up to a signal (find imagery over the event location). Returns ' +
      'minimal scene metadata (id, datetime, footprint, cloud cover, platform, preview) — no imagery ' +
      'bytes. Costs 2 token(s) per call.',
    inputSchema: {
      type: 'object',
      properties: {
        bbox: { ...BBOX, description: 'Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Required.' },
        collection: { type: 'string', enum: [...IMAGERY_COLLECTIONS], description: 'Catalog collection. Defaults to sentinel-2-l2a.' },
        date: { type: 'string', description: 'Window end date, YYYY-MM-DD (UTC). Defaults to today.' },
        days: { type: 'integer', minimum: 1, maximum: SIGNALS_MAX_DAYS, description: 'Window length in days. Defaults to 7.' },
        cloudCoverMax: { type: 'number', minimum: 0, maximum: 100, description: 'Sentinel-2 only: max cloud cover %.' },
        limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Max scenes to return. Defaults to 25.' },
        responseFormat: { type: 'string', enum: ['concise', 'detailed'], description: 'Per-scene field detail. "concise" (default) or "detailed" (adds footprint, constellation, polarizations).' },
      },
      required: ['bbox'],
    },
  },
  {
    name: 'assess_signal',
    annotations: { readOnlyHint: true, idempotentHint: true },
    description:
      'Run an AI RS (remote-sensing) deep-dive assessment for a specific signal: what to observe, ' +
      'recommended sensors, and a collection window. `eventId` is the `id` from query_signals. ' +
      "Costs 5 (quick) or 15 (deep) tokens, charged to the key owner's balance. A prior assessment for " +
      'the same signal is cached (no re-charge). The exact charge and remaining balance are in meta.tokens. ' +
      'Signals that are not satellite-observable (observability:"not-observable" — e.g. political statements ' +
      'or broad-area events with no imageable physical mark) are rejected BEFORE any charge, so pre-filter ' +
      'with query_signals observability:"observable" to spend only where imagery helps.',
    inputSchema: {
      type: 'object',
      properties: {
        eventId: { type: 'integer', description: 'Signal id (global_event_id) from query_signals.' },
        kind: { type: 'string', enum: ['quick', 'deep'], description: 'Assessment depth. Defaults to quick.' },
      },
      required: ['eventId'],
    },
  },
  {
    name: 'ask_analyst',
    annotations: { readOnlyHint: true },
    description:
      'Ask the Delta Analyst an OSINT/GEOINT question. Runs an agentic multi-step analysis over the ' +
      'signal corpus and returns a structured brief (summary, findings with collection recommendations, ' +
      'assessment, citations). Costs 5–45 tokens (usage-based, metered by the compute the question actually ' +
      'uses; charged ONCE, when the run completes; the exact charge and remaining balance are in meta.tokens). ' +
      'Durable async: the run is ENQUEUED and returns {status:"processing", job_id} immediately, then completes ' +
      'in a background worker (typically within a couple of minutes) — so it is never lost to a client timeout. ' +
      'Fetch the finished brief by calling get_analyst_job with the job_id, or ask_analyst again with the SAME ' +
      'idempotencyKey (no second charge).',
    inputSchema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: 'The analytic question (≤ 500 chars).' },
        bbox: { ...BBOX, description: 'Optional focus bounding box [minLon, minLat, maxLon, maxLat] (WGS84).' },
        idempotencyKey: { type: 'string', description: 'Optional at-most-once key. Re-sending the SAME key resolves to the SAME run: if it finished you get the brief with NO second charge; if it is still running you get its processing status. Strongly recommended — it makes a timeout recoverable. Use a fresh key to ask again.' },
      },
      required: ['question'],
    },
  },
  {
    name: 'get_analyst_job',
    annotations: { readOnlyHint: true },
    description:
      'Fetch the status and result of an ask_analyst run by job_id. Returns status "processing" (still ' +
      'running — poll again in ~10-20s), "done" (with the finished brief and meta.tokens), or "error". ' +
      'Free of token charges — the run itself is charged once on completion. A job is visible only to the ' +
      'API key owner that created it. Use this to retrieve the brief after ask_analyst returned a job_id.',
    inputSchema: {
      type: 'object',
      properties: {
        job_id: { type: 'string', description: 'The job_id returned by ask_analyst.' },
      },
      required: ['job_id'],
    },
  },
] as const;

export const RESOURCES = [
  { uri: 'brief://latest', name: 'Daily World Brief (latest)', description: 'The most recent AI-synthesized Daily World Brief (JSON). Free.', mimeType: 'application/json' },
  { uri: 'signals://schema', name: 'Signal object schema', description: 'JSON Schema of the public Signal shape returned by query_signals / /api/v1/signals.', mimeType: 'application/json' },
  { uri: 'usage://current', name: 'API usage & quota', description: 'Remaining token balance and plan capabilities for the calling key. Free.', mimeType: 'application/json' },
  { uri: 'imagery://collections', name: 'Imagery collections', description: 'The satellite catalog collections searchable via search_imagery. Free.', mimeType: 'application/json' },
  { uri: 'status://current', name: 'Data freshness & pipeline status', description: 'How current the data is (ingestion/enrichment frontier), the Daily World Brief status, and an Operational/Delayed/Degraded roll-up. Free.', mimeType: 'application/json' },
] as const;

export const RESOURCE_TEMPLATES = [
  { uriTemplate: 'brief://{date}', name: 'Daily World Brief by date', description: 'The Daily World Brief for a specific UTC date (YYYY-MM-DD). Free.', mimeType: 'application/json' },
] as const;

export const PROMPTS = [
  {
    name: 'daily-situation-briefing',
    description: 'Summarize the current world situation from the Daily World Brief.',
    arguments: [{ name: 'date', description: 'UTC date YYYY-MM-DD (optional; defaults to latest).', required: false }],
  },
  {
    name: 'assess-top-signal',
    description: 'Find the highest-severity recent signal in an area/category and run an RS assessment.',
    arguments: [
      { name: 'bbox', description: 'Bounding box "minLon,minLat,maxLon,maxLat" (optional).', required: false },
      { name: 'category', description: 'Category filter (optional).', required: false },
    ],
  },
  {
    name: 'aoi-watch',
    description: 'Scan an area of interest for recent escalations and recommend collection.',
    arguments: [{ name: 'bbox', description: 'Bounding box "minLon,minLat,maxLon,maxLat".', required: true }],
  },
  {
    name: 'market-exposure-check',
    description:
      'Find recent events that could plausibly move a given market (oil, grain, shipping, ...) and explain each transmission channel. Informational only — not investment advice.',
    arguments: [
      { name: 'market', description: `Market to check: ${MARKET_IMPACTS.join(', ')}.`, required: true },
      { name: 'days', description: 'Lookback window in days (optional; default 3).', required: false },
    ],
  },
] as const;
