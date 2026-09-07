<!--
  AUTO-GENERATED from the Off-Nadir Delta contract registry
  (src/lib/api/toolRegistry.ts + src/lib/api/mcpResources.ts) by
  scripts/gen-contract-artifacts.mjs in the Off-Nadir Delta application repo.

  DO NOT EDIT BY HAND — `node scripts/gen-contract-artifacts.mjs --check` fails on drift,
  and scripts/publish-distribution.sh refuses to publish a stale copy.
-->

# Off-Nadir Delta MCP

**From first signal to satellite evidence.** Give an AI agent a live intelligence workflow:
discover an event, verify the reporting, identify what evidence is missing, determine whether a
satellite can actually resolve it, and produce a collection-ready plan.

Real-time event and geospatial intelligence for OSINT, geopolitical risk, and GEOINT work —
source-linked, geolocated, and current, not a training snapshot.

`42` tools · MCP server version `1.29.0` · [full reference](https://offnadir-delta.com/docs/mcp)

## What it does

Seeing the event is easy. Knowing what you can *prove* — and what evidence is still missing — is
the product. Delta:

- monitors emerging world events and geolocates them
- checks claims against source-linked open data, and reports the source breadth behind each one
- assesses whether the event is observable from space, at what resolution, and by which sensor
- returns a collection-ready recommendation: what to collect, where, and when

## Connect

### Hosted server — recommended

No install. Point any MCP client at the remote endpoint and approve once over OAuth 2.1
(Dynamic Client Registration is supported, so most clients need only the URL):

```
https://offnadir-delta.com/api/v1/mcp
```

In the Claude or ChatGPT apps: **Settings → Connectors → Add custom connector**, paste that URL.
Cursor and VS Code have one-click installs on the [docs page](https://offnadir-delta.com/docs/mcp).

Claude Code:

```bash
claude mcp add --transport http off-nadir-delta https://offnadir-delta.com/api/v1/mcp
```

### This package — local stdio

Use this when your client cannot do remote OAuth, or you would rather hold an API key in an
environment variable and pin a version. Get a key at
[offnadir-delta.com/account/api](https://offnadir-delta.com/account/api).

```json
{
  "mcpServers": {
    "off-nadir-delta": {
      "command": "npx",
      "args": ["-y", "offnadir-delta-mcp"],
      "env": { "OFFNADIR_DELTA_API_KEY": "ond_..." }
    }
  }
}
```

Docker:

```bash
docker run -i --rm -e OFFNADIR_DELTA_API_KEY=ond_... offnadir-delta-mcp
```

The package forwards `tools/call` to the hosted server with your key. `tools/list` answers
locally from a generated catalog, so registries can introspect it without credentials.

### First call — free

23 of the 42 tools cost nothing, so the first thing you run is free:

> Give me the latest Daily World Brief. Lead with the three most significant developments,
> explain why each matters, and cite the supporting signals.

Then try the full signal-to-satellite workflow:

> Find the highest-priority observable event from the last 24 hours, verify the reporting, and
> recommend the best available satellite collection plan.

## Tools

### Discover

What is happening, where it concentrates, and what today looks like.

| Tool | What it does | Cost |
| --- | --- | --- |
| `query_signals` | Geolocated world events (geopolitical, security, disaster, infrastructure) from global news media, AI-enriched with severity/GEOINT scores and collection recommendations. | 3 tok |
| `query_stats` | Roll-ups over the corpus: totals plus per-category and per-day breakdown. | 1 tok |
| `query_hotspots` | Where activity concentrates: density grid-binned into ranked cells with peak severity, categories and representative event_ids. | 1 tok |
| `get_world_brief` | The Daily World Brief — an AI digest of the previous UTC day. | free |
| `query_developments` | What actually CHANGED about the events in an area, not which articles are new. | 3 tok |
| `get_event_thread` | One event end to end: state plus every change in order — the "new event or update" distinction a feed cannot make. | free |
| `search_entities` | Find a place in the location registry — ports, bases, airfields, power plants, chokepoints, named seas. | 1 tok |
| `get_entity` | What has happened at one place: the registry record plus every linked event with HOW it was linked. | 1 tok |
| `get_related_events` | What else connects to one event, and what came before and after. | 3–8 tok |

### Plan

Whether a satellite can resolve it, which one, and when it next passes.

| Tool | What it does | Cost |
| --- | --- | --- |
| `search_imagery` | Search the imagery catalog (Sentinel-1, Sentinel-2, NISAR L-band) over an area and window. | 2 tok |
| `plan_event_imagery` | The deterministic imagery plan for ONE event: checks BOTH sensors exactly once — sentinel-1-grd (SAR, the only look that survives cloud and night) and sentinel-2-l2a — against the event footprint and a pre/post window. | 4 tok |
| `rank_imaging_priority` | WHERE, and with what class of satellite, observation is most worthwhile now: composite IMPORTANCE crossed with the SPEC CLASS the required resolution demands — coarse, hr (free Sentinel-class) or vhr. | 1 tok |
| `survey_observable_events` | Which events a sensor can actually RESOLVE, over the FULL set. | 1 tok |
| `predict_satellite_passes` | WHEN a place can next be imaged and by WHAT: SGP4 over day-cached elements for 13 free-systematic and commercial-taskable families. | 2 tok |
| `test_hypotheses` | Given competing statements, the observation that would REFUTE the most — and those that would refute none. | 3 tok |
| `lookup_elevation` | Terrain height from the Copernicus DEM GLO-30 for a point, bbox or polygon, with relief — the number that governs SAR layover and shadow. | free |
| `analyze_terrain` | Compute FROM the terrain. | free |

### Analyze

Turn reporting into a cited assessment you can audit afterwards.

| Tool | What it does | Cost |
| --- | --- | --- |
| `assess_signal` | AI remote-sensing deep-dive for one signal: what to observe, sensors, a collection window. | 5/15 tok |
| `ask_analyst` | Ask the Delta Analyst an OSINT/GEOINT question; returns a structured brief. | 5–123 tok |
| `get_analyst_job` | Status and result of an ask_analyst run. | free |
| `query_claims` | The ledger of claims this key was given, each with its evidence class, independent source families and publishers. | free |
| `refine_location` | Research one signal's location further and store a better coordinate if the sources genuinely narrow it. | 3–29 tok |
| `measure_index_series` | Measure a spectral index over an area scene by scene through the Sentinel-2 archive. | 0.5 tok |
| `detect_ships` | Count vessel-like targets in ONE Sentinel-1 SAR scene by CFAR detection — radar sees through cloud and at night. | 5 tok |

### Watch

Stand up continuous coverage and be told only when the answer changes. Creating and listing cost nothing — you are metered only when a check actually fires, or a new acquisition is actually measured.

| Tool | What it does | Cost |
| --- | --- | --- |
| `create_standing_order` | Put an area under CONTINUOUS watch: a question plus a bbox, re-answered on a schedule, notifying only when the answer changed. | free |
| `list_standing_orders` | The standing orders on this key: cadence, area, last check, last actual fire, and quiet_checks — a high quiet_checks means the watch is not earning its place. | free |
| `delete_standing_order` | Delete a standing order, or pause/resume with active=false/true. | free |
| `list_monitored_areas` | Places under continuous satellite measurement: metric, latest value, change, anomaly flag, coverage. | free |
| `get_monitored_area` | One monitored area with its full measurement history. | free |
| `create_monitored_area` | Put a place under continuous satellite measurement — every new Sentinel-1/2 or VIIRS acquisition is measured. | free |
| `list_watches` | The Watchlist as one list, each entry with a state bucket. | free |
| `get_watch` | One watch end to end: target, state, latest change, measurements with recent series, standing-order questions, and for an event watch its verification state, developments and thread, plus this account's notes. | free |
| `get_decision_package` | Everything needed to decide what to collect next about one watch, in one object. | 5 tok |
| `create_watch` | Add a target to the Watchlist. | free |
| `update_watch` | Rename, pause or resume a watch. | free |
| `delete_watch` | Delete a watch and its underlying resources — bound monitored areas with their history, and standing orders. | free |
| `add_note` | Add a note to a watch, start a thread, or reply. | free |
| `delete_note` | Delete one note from a watch. | free |

### Workspace

The map assets you own — saved layer sets and your own uploaded data.

| Tool | What it does | Cost |
| --- | --- | --- |
| `list_layer_sets` | The layer sets saved on this account. | free |
| `get_layer_set` | One saved layer set by id. | free |
| `list_uploaded_layers` | The data this account uploaded to the map, plus the formats the uploader accepts. | free |

### Account

Pre-flight your token balance before a metered call.

| Tool | What it does | Cost |
| --- | --- | --- |
| `get_usage` | The calling key's remaining token balance and plan capabilities. | free |

## Pricing and metering

Usage-based Delta tokens, identical over REST and MCP. Costs above are generated from the same
constant the biller reads, and every metered result carries the exact charge it incurred — so
you never have to trust a number in a README. Free tools never touch the balance.

`ask_analyst` is **hybrid-async**: it enqueues a run and returns a `job_id` immediately; poll
`get_analyst_job` (free — the run is charged once, on completion). Most questions finish in
~30–90s; a brief with satellite-imagery lookups or many sources can take 2–3 minutes.

The API and the MCP server are available on **every plan, including Free** — the only gate is
your token balance. Call `get_usage` (free) to pre-flight. Current limits and package prices:
[offnadir-delta.com/pricing](https://offnadir-delta.com/pricing).

## Authentication

Two credentials are accepted on the hosted endpoint:

- **OAuth 2.1** with PKCE and Dynamic Client Registration — for interactive clients
- **Bearer API key** (`Authorization: Bearer ond_...`) — for servers, CI, and this stdio package

Keys are shown once at creation, hashed at rest, and revocable at any time from
[/account/api](https://offnadir-delta.com/account/api).

## Resources and prompts

| Resource | Description |
| --- | --- |
| `brief://latest` | The most recent AI-synthesized Daily World Brief (JSON). Free. |
| `signals://schema` | JSON Schema of the public Signal shape returned by query_signals / /api/v1/signals. |
| `usage://current` | Remaining token balance and plan capabilities for the calling key. Free. |
| `imagery://collections` | The satellite catalog collections searchable via search_imagery — Sentinel-1 C-band SAR, Sentinel-2 optical, and NISAR L-band SAR (provisional calibration). Free. |
| `status://current` | How current the data is (ingestion/enrichment frontier), the Daily World Brief status, and an Operational/Delayed/Degraded roll-up. Free. |
| `brief://{date}` | The Daily World Brief for a specific UTC date (YYYY-MM-DD). Free. |
| `watch://{watch_id}` | A Watchlist entry with its current state, latest meaningful change, measurements, (for event watches) the full event thread, and the notes kept against it. The same body get_watch returns. Free. |

| Prompt | Description |
| --- | --- |
| `daily-situation-briefing` | Summarize the current world situation from the Daily World Brief. |
| `assess-top-signal` | Find the highest-severity recent signal in an area/category and run an RS assessment. |
| `aoi-watch` | Scan an area of interest for recent escalations and recommend collection. |
| `market-exposure-check` | Find recent events that could plausibly move a given market (oil, grain, shipping, ...) and explain each transmission channel. Informational only — not investment advice. |

## Links

- [Tool reference, setup, and one-click installs](https://offnadir-delta.com/docs/mcp)
- [REST API reference](https://offnadir-delta.com/docs/api) · [OpenAPI](https://offnadir-delta.com/api/v1/openapi.json)
- [Changelog and compatibility policy](https://offnadir-delta.com/docs/changelog)
- [Live server version probe](https://offnadir-delta.com/api/v1/version) (no auth, no tokens)

## License

Apache-2.0
