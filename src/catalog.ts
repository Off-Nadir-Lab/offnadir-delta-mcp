/**
 * Static introspection catalog for the Off-Nadir Delta stdio MCP proxy.
 *
 * AUTO-GENERATED from the Off-Nadir Delta contract registry
 * (src/lib/api/toolRegistry.ts + src/lib/api/mcpResources.ts) by
 * scripts/gen-contract-artifacts.mjs — DO NOT EDIT BY HAND.
 *
 * These tool / resource / prompt definitions mirror the live remote MCP server
 * (https://offnadir-delta.com/api/v1/mcp) so that `tools/list`, `resources/list`,
 * and `prompts/list` answer instantly and WITHOUT credentials — this is what
 * lets registries (e.g. Glama) introspect the server in a bare container.
 *
 * Actual `tools/call` / `resources/read` / `prompts/get` requests are forwarded
 * to the remote server with the caller's OFFNADIR_DELTA_API_KEY (see index.ts).
 */

// Generated for Off-Nadir Delta MCP 1.8.0.

export const TOOLS = [
  {
    "name": "query_signals",
    "description": "Query geolocated world event signals (Delta Signals: geopolitical, security, disaster, and infrastructure events distilled from global news media, AI-enriched with severity/GEOINT scores and satellite-collection recommendations). Filter by bounding box, date window, and category. Costs 3 token(s) per call, charged to the API key owner's balance.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Omit for worldwide."
        },
        "date": {
          "type": "string",
          "description": "Window end date, YYYY-MM-DD (UTC). Defaults to today."
        },
        "days": {
          "type": "integer",
          "minimum": 1,
          "maximum": 30,
          "description": "Window length in days ending on `date`. Defaults to 1."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "kinetic",
              "armed_conflict",
              "maritime",
              "natural_disaster",
              "infrastructure",
              "aviation",
              "humanitarian",
              "protest",
              "diplomacy",
              "other"
            ]
          },
          "description": "Restrict to these categories. Omit for all."
        },
        "markets": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "oil",
              "natural_gas",
              "grain",
              "shipping",
              "defense",
              "metals",
              "semiconductors",
              "fx",
              "equities"
            ]
          },
          "description": "Restrict to signals AI-tagged as exposing these financial markets via a direct physical/supply channel (informational only, not investment advice). Omit for all."
        },
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 500,
          "description": "Maximum rows per page. Defaults to 100."
        },
        "cursor": {
          "type": "string",
          "description": "Opaque pagination cursor from a previous response's meta.next_cursor."
        },
        "minSeverity": {
          "type": "number",
          "minimum": 0,
          "maximum": 10,
          "description": "Keep only signals with severity_score >= this (0-10)."
        },
        "escalating": {
          "type": "boolean",
          "description": "Keep only signals whose escalation_trend is \"escalating\"."
        },
        "sort": {
          "type": "string",
          "enum": [
            "severity",
            "recent",
            "sources",
            "geoint"
          ],
          "description": "Result ordering. Omit for the feed's default ranking. \"geoint\" ranks by the continuous GEOINT collection priority (intelligence.collection_priority) — an imageability gate times tasking value (severity, urgency, information gain, corroboration, escalation, market) — so imageable, decision-relevant events (e.g. a high-severity escalating strike) rise and non-observable news noise sinks. This is NOT the saturated geoint_score."
        },
        "updatedSince": {
          "type": "string",
          "description": "Differential fetch: only signals (re)enriched at/after this ISO 8601 timestamp. Ignores the date window. Response signals carry last_updated_at."
        },
        "createdSince": {
          "type": "string",
          "description": "Differential fetch: only signals first enriched at/after this ISO 8601 timestamp."
        },
        "observability": {
          "type": "string",
          "enum": [
            "observable",
            "not-observable"
          ],
          "description": "Keep only signals with this satellite observability — whether a physical mark is imageable at all (intelligence.satellite_observability)."
        },
        "observabilityStatus": {
          "type": "string",
          "enum": [
            "observable",
            "not_observable",
            "insufficient_detail"
          ],
          "description": "3-state observability filter. Unlike `observability` (binary), this exposes `insufficient_detail` — signals where imageability is unknown (no RS enrichment yet, unresolved location, or an Impossible verdict rescued because the event reads kinetic). `not_observable` = a considered \"nothing to image\"; neither bucket leaks insufficient_detail."
        },
        "openData": {
          "type": "string",
          "enum": [
            "sufficient",
            "commercial-recommended",
            "not-applicable"
          ],
          "description": "Keep only signals with this open-data sufficiency — free imagery is enough vs commercial tasking recommended (intelligence.open_data_sufficiency)."
        },
        "minInformationGain": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "Keep only signals whose intelligence.expected_information_gain >= this (0-1)."
        },
        "taskableOnly": {
          "type": "boolean",
          "description": "Keep only signals whose coordinate is search_ready — GEO-READY ONLY: drops country centroids, ADM1 mismatches, reporting-dateline fallbacks and unresolved fixes (intelligence.geo_validation.search_ready). It does NOT imply observable or quality-passed, so not-observable / insufficient-detail / quality-failed signals can still appear. For automated imagery tasking use collectionReadyOnly (or combine with observability:\"observable\")."
        },
        "collectionReadyOnly": {
          "type": "boolean",
          "description": "STRICT tasking-candidate filter: search_ready AND observability=observable AND quality.status!=failed AND a concrete collection plan (rs_target + rs_reason present) AND an event coordinate. The safe input set for automated imagery tasking — a superset of every gate taskableOnly alone does not check."
        },
        "responseFormat": {
          "type": "string",
          "enum": [
            "concise",
            "detailed"
          ],
          "description": "Per-signal field detail. \"concise\" (default) returns the key decision + GEOINT fields (id, date, category, title, location, lat/lng, severity/geoint scores, collection_priority, escalation, market, rs_level/rs_sensor, observability, observability_status, verification_status, geo_status, search_ready, article_count, independent_source_count, information_gain) — cheaper to scan. \"detailed\" returns the full Signal object (shape per the signals://schema resource)."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "signals": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "required": [
        "meta",
        "signals"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "query_stats",
    "description": "Aggregate statistics over the signal corpus — total event count plus per-category and per-day breakdown (trend) for a bounding box and date window. Cheaper than query_signals (returns roll-ups, not rows). NOTE the unit: `total` counts article-deduped events (meta.population = article_deduped_events), which is NOT cluster-collapsed, so it is >= the query_signals count for the same window. Costs 1 token(s) per call.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Omit for worldwide."
        },
        "date": {
          "type": "string",
          "description": "Window end date, YYYY-MM-DD (UTC). Defaults to today."
        },
        "days": {
          "type": "integer",
          "minimum": 1,
          "maximum": 30,
          "description": "Window length in days. Defaults to 1."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "kinetic",
              "armed_conflict",
              "maritime",
              "natural_disaster",
              "infrastructure",
              "aviation",
              "humanitarian",
              "protest",
              "diplomacy",
              "other"
            ]
          },
          "description": "Restrict to these categories. Omit for all."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "stats": {
          "type": "object"
        }
      },
      "required": [
        "meta",
        "stats"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "query_hotspots",
    "description": "Geographic hotspots — signal density grid-binned into cells, ranked by event count, each with peak severity, the categories present, and up to 5 representative event_ids (trace a cell back to its signals). Use to find WHERE activity is concentrating. NOTE the unit: cells count satellite-observable points (meta.population = rs_observable_points); meta reports source_point_count and dropped_by_geo_count / dropped_by_severity_count so point_count is fully accountable. Costs 1 token(s) per call.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Omit for worldwide."
        },
        "date": {
          "type": "string",
          "description": "Window end date, YYYY-MM-DD (UTC). Defaults to today."
        },
        "days": {
          "type": "integer",
          "minimum": 1,
          "maximum": 30,
          "description": "Window length in days. Defaults to 1."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "kinetic",
              "armed_conflict",
              "maritime",
              "natural_disaster",
              "infrastructure",
              "aviation",
              "humanitarian",
              "protest",
              "diplomacy",
              "other"
            ]
          },
          "description": "Restrict to these categories. Omit for all."
        },
        "precision": {
          "type": "number",
          "minimum": 0.1,
          "maximum": 5,
          "description": "Grid cell size in decimal degrees. Defaults to 1."
        },
        "minSeverity": {
          "type": "number",
          "minimum": 0,
          "maximum": 10,
          "description": "Keep only points with severity_score >= this."
        },
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 500,
          "description": "Max source points sampled before grid-binning — NOT the number of cells returned. Defaults to 500 (the max). Lower values sample fewer events and fragment clusters (each cell trends toward count 1), so leave at the default for a representative density map."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "hotspots": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "required": [
        "meta",
        "hotspots"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "get_world_brief",
    "description": "Fetch the Daily World Brief — an AI-synthesized OSINT/GEOINT digest of the previous UTC day's worldwide event signals (headline, executive summary, top developments with why-it-matters and what-to-watch, per-theme roll-up, ranked signals). Free of token charges. The result includes a freshness object (brief_date, age_hours, is_stale) — if is_stale is true this is the latest published brief and a newer day is not yet available, so relay it as possibly out of date.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "description": "Brief date, YYYY-MM-DD (UTC). Defaults to the latest available."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "brief": {
          "type": "object"
        },
        "freshness": {
          "type": "object",
          "description": "Freshness of the returned brief: brief_date, generated_at, age_hours, freshness (operational|delayed|degraded), is_stale, note."
        }
      },
      "required": [
        "brief"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "get_usage",
    "description": "Check the calling key's remaining token balance and plan capabilities — monthly allocation, tokens used this period, tokens remaining, and whether the plan includes AI tools over the API (assess_signal / ask_analyst). Use this to pre-flight a metered call: decide whether enough balance is left before spending. Free of token charges.",
    "inputSchema": {
      "type": "object",
      "properties": {}
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "tokens": {
          "type": "object",
          "properties": {
            "allocation": {
              "type": "number",
              "description": "Monthly token allocation for the plan."
            },
            "used": {
              "type": "number",
              "description": "Tokens used in the current period."
            },
            "remaining": {
              "type": "number",
              "description": "Tokens remaining this period."
            }
          },
          "required": [
            "allocation",
            "used",
            "remaining"
          ]
        },
        "plan": {
          "type": "object",
          "properties": {
            "api_llm_access": {
              "type": "boolean",
              "description": "Whether AI tools over the API are enabled."
            }
          },
          "required": [
            "api_llm_access"
          ]
        }
      },
      "required": [
        "tokens",
        "plan"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "search_imagery",
    "description": "Search the satellite imagery catalog (Sentinel-1/2, OPERA RTC-S1) for scenes over an area and date window — the natural follow-up to a signal (find imagery over the event location). Returns scene metadata (id, datetime, footprint, cloud cover, platform, orbit geometry, coverage, catalog link) — no imagery bytes. Pass eventDate to classify each scene timing=pre/post/same_day_unknown (a same-day scene is same_day_unknown, never post, without a real event time) and get pre/post bracketing + window_status + SAR sar_pair_status in meta. Pass eventPoint [lon,lat] and/or eventAoi [minLon,minLat,maxLon,maxLat] to get each scene's target_relation (covers_event_geometry = pure geometry gate; usable_for_analysis additionally requires acceptable cloud for optical, so a 99%-cloud scene is geometry-covering but not analysis-usable) — so a scene that only clips the wide bbox is not mistaken for covering the event. Costs 2 token(s) per call.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Bounding box [minLon, minLat, maxLon, maxLat] (WGS84). Required."
        },
        "collection": {
          "type": "string",
          "enum": [
            "sentinel-1-grd",
            "sentinel-1-rtc",
            "sentinel-2-l2a",
            "OPERA_L2_RTC-S1_V1"
          ],
          "description": "Catalog collection. Defaults to sentinel-2-l2a."
        },
        "date": {
          "type": "string",
          "description": "Window end date, YYYY-MM-DD (UTC). Defaults to today."
        },
        "days": {
          "type": "integer",
          "minimum": 1,
          "maximum": 30,
          "description": "Window length in days. Defaults to 7."
        },
        "eventDate": {
          "type": "string",
          "description": "Event date, YYYY-MM-DD (UTC). When set, each scene is tagged timing=pre/post/same_day_unknown and the search window is widened to the canonical pre/post span, so meta reports has_pre_baseline / has_post / bracketing_available / window_status; for sentinel-1-grd it also reports sar_pair_status (ready | not_ready | indeterminate_event_time) + orbit_note."
        },
        "eventPoint": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 2,
          "maxItems": 2,
          "description": "Event point [lon, lat] (WGS84). When set, each scene reports target_relation.covers_event_point / usable_for_event so a scene that only clips the wide bbox is not presented as covering the event."
        },
        "eventAoi": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Event AOI bbox [minLon, minLat, maxLon, maxLat] (WGS84). Drives target_relation.intersects_event_aoi / event_aoi_coverage_ratio."
        },
        "eventTimestamp": {
          "type": "string",
          "description": "Full event timestamp (ISO 8601) when known — promotes same-day scenes from same_day_unknown to pre/post by time."
        },
        "cloudCoverMax": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "description": "Sentinel-2 only: max cloud cover %."
        },
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Max scenes to return. Defaults to 25."
        },
        "responseFormat": {
          "type": "string",
          "enum": [
            "concise",
            "detailed"
          ],
          "description": "Per-scene field detail. \"concise\" (default) returns id, collection, datetime, timing, cloud_cover, platform, orbit_state, relative_orbit, instrument_mode, product_type, coverage_ratio, covers_event_point, usable_for_event, stac_item_url, preview. \"detailed\" adds the full footprint bbox/geometry, the complete target_relation, constellation, polarizations, absolute_orbit, incidence_angle, and non-signed asset hrefs."
        }
      },
      "required": [
        "bbox"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "scenes": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "required": [
        "meta",
        "scenes"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "plan_event_imagery",
    "description": "Plan the imagery evidence for ONE event in a single call, instead of guessing collections one at a time. Give the event_id and what you are trying to establish (damage_assessment | flood_mapping | wildfire_assessment) and the SERVER runs the deterministic plan for that goal: it always checks BOTH in-app sensors — sentinel-1-grd (SAR: all-weather, the only look that survives cloud and night) and sentinel-2-l2a (optical, human-legible) — exactly once each, against the event’s own footprint and a pre/post window around its date. The result carries, per search, why it was made, how many scenes came back, how many actually COVER the event and are usable (cloud-obscured optical does not count), the SAR pair status, and whether a pre/post bracket exists. It also states screening / detection / identification capability: Sentinel-1/2 screen and detect at facility scale, and only object-level identification needs commercial VHR — a VHR recommendation NEVER invalidates what the free catalog already showed. Prefer this over several search_imagery calls for the same event: it cannot miss the SAR look and cannot repeat a search. An event with no resolvable footprint is refused rather than planned against a guess. Costs 4 token(s) per call (it deliberately issues two catalog searches).",
    "inputSchema": {
      "type": "object",
      "properties": {
        "event_id": {
          "type": "integer",
          "description": "The `id` from query_signals. The server resolves its authoritative point + AOI."
        },
        "analysis_goal": {
          "type": "string",
          "enum": [
            "damage_assessment",
            "flood_mapping",
            "wildfire_assessment"
          ],
          "description": "What the imagery must establish — decides which collection leads and how cloud is gated."
        },
        "event_date": {
          "type": "string",
          "description": "Event date YYYY-MM-DD. Optional — the event row supplies it when known."
        }
      },
      "required": [
        "event_id",
        "analysis_goal"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "plan": {
          "type": "object"
        }
      },
      "required": [
        "meta",
        "plan"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "rank_imaging_priority",
    "description": "WHERE — and with what class (and therefore cost) of satellite — is observation most worthwhile right now? Crosses each event’s composite IMPORTANCE (severity × source breadth × market relevance) with the SPEC CLASS its required resolution demands: coarse (≤100 m), hr (≤10 m, Sentinel-class free data) or vhr (sub-metre, commercial tasking). Returns how many imageable events fall in each class with their mean importance, plus the top targets with importance, required class and AOI. Use it to triage a theatre before spending on imagery: a high-importance event that only needs hr is answerable with free Sentinel data, while a vhr one is what a paid order is for. Deterministic — no LLM, no per-event cost. Costs 1 token(s) per call.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Area [west, south, east, north] in WGS84. Omit for a global survey."
        },
        "start_date": {
          "type": "string",
          "description": "Inclusive start date YYYY-MM-DD. Defaults to today; clamped to your plan history floor."
        },
        "end_date": {
          "type": "string",
          "description": "Inclusive end date YYYY-MM-DD. Defaults to today. The window is capped at 30 days."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Restrict to these Delta categories (kinetic, armed_conflict, maritime, natural_disaster, infrastructure, aviation, humanitarian, protest, diplomacy)."
        },
        "min_geoint_score": {
          "type": "number",
          "description": "Drop events below this GEOINT score before ranking."
        },
        "top_n": {
          "type": "number",
          "minimum": 1,
          "maximum": 50,
          "description": "How many top targets to return (default 12)."
        }
      },
      "required": []
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "priority": {
          "type": "object"
        }
      },
      "required": [
        "meta",
        "priority"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "survey_observable_events",
    "description": "Which events in a window can a given in-app sensor actually RESOLVE? Evaluates the FULL set (not just the top few) against each event’s precomputed required resolution, and returns how many are observable vs not, the breakdown by required resolution, and the top observable events with the ready-made imaging rationale. Observability here is resolvability — whether the physical mark is large enough for the sensor: Sentinel-2 is ~10 m optical (needs daylight and clear sky), Sentinel-1 is SAR (all-weather, day or night). Prefer this over asking about events one at a time: it is exhaustive AND cheap, and it is the honest way to answer \"what can we actually see\" before committing collection effort. The population is deliberately UNGATED by tasking readiness — it answers \"what could this sensor resolve\", not \"what may we task\" — so its total sits above rank_imaging_priority and counts a different unit from query_signals' clusters; see population_detail, and read collection_ready per event for taskability. Deterministic — no LLM. Costs 1 token(s) per call.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "sensor": {
          "type": "string",
          "enum": [
            "sentinel-2",
            "sentinel-1"
          ],
          "description": "Which in-app sensor to evaluate against. sentinel-2 = ~10 m optical (daylight, clear sky); sentinel-1 = SAR (all-weather, day/night). Default sentinel-2."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Area [west, south, east, north] in WGS84. Omit for a global survey."
        },
        "start_date": {
          "type": "string",
          "description": "Inclusive start date YYYY-MM-DD. Defaults to today; clamped to your plan history floor."
        },
        "end_date": {
          "type": "string",
          "description": "Inclusive end date YYYY-MM-DD. Defaults to today. The window is capped at 30 days."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Restrict to these Delta categories."
        },
        "min_geoint_score": {
          "type": "number",
          "description": "Drop events below this GEOINT score before surveying."
        },
        "top_n": {
          "type": "number",
          "minimum": 1,
          "maximum": 50,
          "description": "How many observable events to return (default 20)."
        }
      },
      "required": []
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "survey": {
          "type": "object"
        }
      },
      "required": [
        "meta",
        "survey"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "predict_satellite_passes",
    "description": "WHEN can this place next be imaged, and by WHAT — the timing half of collection planning. Propagates current orbital elements (SGP4 over day-cached CelesTrak two-line elements) for seven families and returns the access windows over a target: Sentinel-1 (SAR), Sentinel-2 and Landsat (free, SYSTEMATIC — routinely collected, so near-certain), plus WorldView, ICEYE, Capella and SkySat (commercial, AGILE — taskable ACCESS opportunities that require a paid order and are NOT guaranteed collects). Each pass carries acquisition/loss times, the closest-approach instant, peak elevation, OFF-NADIR angle, ground distance, ascending/descending, solar elevation and whether the target is sunlit (optical needs light; SAR does not), and the age of the element set it was computed from. Use it to answer \"when is the next chance to see this\", to choose between waiting for a free systematic pass and paying to task an agile one, and to time a pre/post change-detection pair. Give lat/lon, or a bbox whose centre is used. Horizon is capped at 7 days. If elements cannot be retrieved the result says so (retrieval_ok:false) — that means timing is UNAVAILABLE, never \"no passes\". Every pass is a GEOMETRIC access opportunity computed from orbital elements and swath width (geometry_only:true, acquisition_plan_verified:false): no operator collection plan is consulted, so this is when a sensor COULD see the target, never a confirmed acquisition schedule. With no start_date the window begins NOW, so the first pass listed is always still ahead. Costs 2 token(s) per call.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90,
          "description": "Target latitude (-90..90; positive = North). Required unless bbox is given."
        },
        "lon": {
          "type": "number",
          "minimum": -180,
          "maximum": 180,
          "description": "Target longitude (-180..180; positive = East). Required unless bbox is given."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Area [west, south, east, north] in WGS84. The CENTRE is used as the target when lat/lon are omitted."
        },
        "start_date": {
          "type": "string",
          "description": "Inclusive start date YYYY-MM-DD (UTC). Defaults to today."
        },
        "end_date": {
          "type": "string",
          "description": "Inclusive end date YYYY-MM-DD (UTC). Defaults to start+2 days; the window is capped to a 7-day horizon."
        },
        "satellites": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "sentinel-1",
              "sentinel-2",
              "landsat",
              "worldview",
              "iceye",
              "capella",
              "skysat"
            ]
          },
          "description": "Families to consider. Omit for all seven. Use this to compare \"free systematic only\" against \"what could I task\"."
        },
        "max_passes": {
          "type": "number",
          "minimum": 1,
          "maximum": 100,
          "description": "Maximum passes to return, soonest first (default 40)."
        }
      },
      "required": []
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "passes": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "freshness": {
          "type": "object"
        }
      },
      "required": [
        "meta",
        "passes"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "assess_signal",
    "description": "Run an AI RS (remote-sensing) deep-dive assessment for a specific signal: what to observe, recommended sensors, and a collection window. `eventId` is the `id` from query_signals. The result also carries a deterministic `context` block (event id/date, normalized target, AOI bbox, observability + quality verdict, and an `imagery_handoff` giving the exact bbox + event_date to pass to search_imagery for REAL pre/post scene candidates) — turning the assessment into an actionable collection plan. Costs 5 (quick) or 15 (deep) tokens, charged to the key owner's balance. A prior assessment for the same signal is cached (no re-charge). The exact charge and remaining balance are in the result meta.tokens. Signals that are not satellite-observable (observability:\"not-observable\" — e.g. political statements or broad-area events with no imageable physical mark) are rejected BEFORE any charge, so pre-filter with query_signals observability:\"observable\" to spend only where imagery helps.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "eventId": {
          "type": "integer",
          "description": "Signal id (global_event_id) from query_signals."
        },
        "kind": {
          "type": "string",
          "enum": [
            "quick",
            "deep"
          ],
          "description": "Assessment depth. Defaults to quick."
        }
      },
      "required": [
        "eventId"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "kind": {
          "type": "string"
        },
        "cached": {
          "type": "boolean"
        },
        "model": {
          "type": "string"
        },
        "content": {
          "type": "object"
        },
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        }
      },
      "required": [
        "kind",
        "content",
        "meta"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true,
      "idempotentHint": true
    }
  },
  {
    "name": "ask_analyst",
    "description": "Ask the Delta Analyst an OSINT/GEOINT question. Runs an agentic multi-step analysis over the signal corpus and returns a structured brief (summary, findings with collection recommendations, assessment, citations). Costs 5–123 tokens (usage-based, metered by the compute the question actually uses; charged ONCE, when the run completes; the exact charge and remaining balance are in the result meta.tokens). Durable async: the run is ENQUEUED and returns {status:\"processing\", job_id} immediately, then completes in a background worker — so it is never lost to a client timeout. Timing: most questions finish in ~30–90s; a complex brief (satellite-imagery lookups or many sources) can take 2–3 minutes. Fetch the finished brief by calling get_analyst_job with the job_id (poll every ~10–20s), or ask_analyst again with the SAME idempotencyKey (no second charge).",
    "inputSchema": {
      "type": "object",
      "properties": {
        "question": {
          "type": "string",
          "description": "The analytic question (≤ 500 chars)."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Optional focus bounding box [minLon, minLat, maxLon, maxLat] (WGS84)."
        },
        "mode": {
          "type": "string",
          "enum": [
            "fast",
            "deep"
          ],
          "description": "fast (default) or deep. Deep enables extended reasoning and wider evidence-gathering budgets — for forecasting, collection trade-offs and market-implication questions where step-by-step reasoning materially helps. It is slower and the ceiling rises from 123 to 415 tokens; charging stays metered by what the run actually consumes, so a light deep question does not cost the ceiling."
        },
        "idempotencyKey": {
          "type": "string",
          "description": "Optional at-most-once key. Re-sending the SAME key resolves to the SAME run: if it finished you get the brief with NO second charge; if it is still running you get its processing status. Strongly recommended — it makes a timeout recoverable. Use a fresh key to ask again."
        },
        "response_format": {
          "type": "string",
          "enum": [
            "full",
            "compact"
          ],
          "description": "\"full\" (default) returns the prose brief alongside the structured result. \"compact\" omits the prose brief and returns only the structured result — which still carries the assembled structured_summary — so a completed run costs materially fewer context tokens."
        }
      },
      "required": [
        "question"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "brief": {
          "type": "object"
        },
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "status": {
          "type": "string",
          "description": "\"processing\" when the run is still going (poll get_analyst_job or re-send the same idempotencyKey)."
        },
        "job_id": {
          "type": "string",
          "description": "Id of the analyst run — pass to get_analyst_job (also at GET /api/v1/analyst/{job_id})."
        },
        "progress": {
          "type": "object",
          "description": "Pipeline progress while the job is processing. completed_steps reaches total_steps ONLY when status is \"done\".",
          "properties": {
            "stage": {
              "type": "string",
              "enum": [
                "queued",
                "retrieval",
                "imagery_reconciliation",
                "synthesis",
                "final_validation",
                "persistence",
                "complete"
              ],
              "description": "Current pipeline stage."
            },
            "completed_steps": {
              "type": "integer",
              "description": "Completed pipeline steps (0-6)."
            },
            "total_steps": {
              "type": "integer",
              "description": "Always 6."
            },
            "agent_progress": {
              "type": "object",
              "description": "The model's internal step counter (an upper bound on the steps a run may take), or null.",
              "properties": {
                "completed_steps": {
                  "type": "integer"
                },
                "total_steps": {
                  "type": "integer"
                }
              }
            }
          },
          "required": [
            "stage",
            "completed_steps",
            "total_steps"
          ]
        },
        "estimated_charge": {
          "type": "object",
          "description": "The charge ceiling quoted for THIS run, fixed at enqueue (統合改善指示書 P1-1). The completed run reports the actual charge in meta.tokens.charged and echoes this ceiling as meta.tokens.maximum_promised; actual never exceeds it.",
          "properties": {
            "minimum": {
              "type": "integer",
              "description": "Floor charge for any completed run."
            },
            "maximum": {
              "type": "integer",
              "description": "Ceiling this run may be charged."
            }
          },
          "required": [
            "minimum",
            "maximum"
          ]
        },
        "message": {
          "type": "string"
        }
      }
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "get_analyst_job",
    "description": "Fetch the status and result of an ask_analyst run by job_id. Job status is ONLY \"processing\" (still running — poll again in ~10-20s), \"done\" (with the finished brief and meta.tokens), or \"error\". When done, result_quality.status (\"complete\" | \"partial\", with any issues[]) reports whether the structured output is fully populated — this is SEPARATE from the job status (a done job can carry a partial result). Free of token charges — the run itself is charged once on completion. A job is visible only to the API key owner that created it.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "job_id": {
          "type": "string",
          "description": "The job_id returned by ask_analyst."
        },
        "response_format": {
          "type": "string",
          "enum": [
            "full",
            "compact"
          ],
          "description": "\"full\" (default) returns the prose brief alongside the structured result. \"compact\" omits the prose brief and returns only the structured result — which still carries the assembled structured_summary — so a re-fetch costs materially fewer context tokens."
        }
      },
      "required": [
        "job_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "job_id": {
          "type": "string"
        },
        "status": {
          "type": "string",
          "description": "\"processing\" | \"done\" | \"error\"."
        },
        "progress": {
          "type": "object",
          "description": "Pipeline progress while the job is processing. completed_steps reaches total_steps ONLY when status is \"done\".",
          "properties": {
            "stage": {
              "type": "string",
              "enum": [
                "queued",
                "retrieval",
                "imagery_reconciliation",
                "synthesis",
                "final_validation",
                "persistence",
                "complete"
              ],
              "description": "Current pipeline stage."
            },
            "completed_steps": {
              "type": "integer",
              "description": "Completed pipeline steps (0-6)."
            },
            "total_steps": {
              "type": "integer",
              "description": "Always 6."
            },
            "agent_progress": {
              "type": "object",
              "description": "The model's internal step counter (an upper bound on the steps a run may take), or null.",
              "properties": {
                "completed_steps": {
                  "type": "integer"
                },
                "total_steps": {
                  "type": "integer"
                }
              }
            }
          },
          "required": [
            "stage",
            "completed_steps",
            "total_steps"
          ]
        },
        "brief": {
          "type": "object"
        },
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "error": {
          "type": "string",
          "description": "Failure reason when status is \"error\"."
        },
        "message": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        }
      }
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "query_claims",
    "description": "Read the LEDGER of claims this key has been given — every factual assertion the Analyst made, with its evidence class (CONFIRMED / REPORTED / PARTY_CLAIM / ASSESSMENT), how many INDEPENDENT source families backed it, and the publishers. The point is the time axis: when a later answer restated the same assertion, the claim carries the link and says which way the evidence moved — restated_only surfaces those chains, and downgraded_only isolates the cases where a later answer was LESS sure than an earlier one, which is where this product contradicted itself. Use it to audit what you were told before acting on it, or to check whether an assertion has since weakened. Scoped to your own key; no other caller’s claims are visible. Free of token charges.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "since": {
          "type": "string",
          "description": "Only claims asserted on or after this date (YYYY-MM-DD or ISO 8601)."
        },
        "evidence_class": {
          "type": "string",
          "enum": [
            "CONFIRMED",
            "REPORTED",
            "PARTY_CLAIM",
            "DISPUTED",
            "ASSESSMENT",
            "UNKNOWN"
          ],
          "description": "Restrict to one evidence class."
        },
        "restated_only": {
          "type": "boolean",
          "description": "Only claims that sit in a restatement chain."
        },
        "downgraded_only": {
          "type": "boolean",
          "description": "Only claims a later answer restated with WEAKER evidence — read these first."
        },
        "limit": {
          "type": "number",
          "minimum": 1,
          "maximum": 200,
          "description": "How many claims to return (default 50)."
        }
      },
      "required": []
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "claims": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "counts": {
          "type": "object"
        }
      },
      "required": [
        "claims"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "create_standing_order",
    "description": "Put an area under CONTINUOUS watch: save a question plus a bounding box and Delta re-answers it on a schedule, notifying only when the answer actually changed. Creating one is FREE. Each time it fires it runs ask_analyst and is metered like any Analyst question, so the cost is per CHANGE, not per check: a deterministic pass over the corpus decides whether anything new crossed the reporting bar, and quiet periods never invoke the model or charge anything. Returns projected_monthly_tokens_max — the ceiling if every single check fired — so the cost is visible before committing. Cadence and how many orders you may hold are set by your plan; the error says which limit you hit. Use it when the question is \"tell me when this changes\" rather than \"what is happening right now\".",
    "inputSchema": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Area to watch, [west, south, east, north] in WGS84. Required — a global standing order would fire on everything."
        },
        "question": {
          "type": "string",
          "description": "The question to re-answer each time something changes. Omit for \"what changed in this area, and what does it mean?\"."
        },
        "name": {
          "type": "string",
          "description": "Label for the order (default \"Standing order\")."
        },
        "cadence": {
          "type": "string",
          "enum": [
            "daily",
            "weekly",
            "monthly"
          ],
          "description": "How often to CHECK (checking is free; only a fired check costs tokens). Default weekly. Faster cadences may require a higher plan."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Restrict the watch to these Delta categories (kinetic, armed_conflict, maritime, natural_disaster, infrastructure, aviation, humanitarian, protest, diplomacy)."
        },
        "min_geoint_score": {
          "type": "number",
          "description": "Reporting bar (0-10, default 6). Raise it to be told only about major developments."
        },
        "min_new_events": {
          "type": "number",
          "description": "How many new qualifying events must appear before a run is triggered (default 1)."
        },
        "notify_email": {
          "type": "boolean",
          "description": "Email the result when it fires (default true). Results are readable via list_standing_orders either way."
        }
      },
      "required": [
        "bbox"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "order": {
          "type": "object"
        },
        "projected_monthly_tokens_max": {
          "type": "number"
        }
      },
      "required": [
        "order"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "list_standing_orders",
    "description": "List the standing orders on this key, with each one’s cadence, watched area, when it last checked, when it last actually fired, and how many consecutive checks found nothing (quiet_checks — a high number means the watch is not earning its place). Also returns how many orders the plan allows and how many remain. Free of token charges.",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "orders": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "limits": {
          "type": "object"
        }
      },
      "required": [
        "orders"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "delete_standing_order",
    "description": "Delete a standing order by id, or pause/resume it instead by passing active=false/true. Pausing keeps the order and its history; deleting removes both. Neither costs tokens. A paused order still counts against the plan limit, so delete rather than pause when you want the slot back.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "The id returned by create_standing_order or list_standing_orders."
        },
        "active": {
          "type": "boolean",
          "description": "Omit to DELETE. Pass false to pause and true to resume, keeping the order."
        }
      },
      "required": [
        "order_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "deleted": {
          "type": "string"
        },
        "order": {
          "type": "object"
        }
      }
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true,
      "idempotentHint": true
    }
  },
  {
    "name": "list_monitored_areas",
    "description": "List the places under continuous satellite measurement on this key (Delta Monitor), with each area’s metric, most recent value, change since the previous measurement, whether that value was flagged anomalous, and coverage — how many acquisitions were measured versus how many exist. Coverage window_total is null when the catalog total is UNKNOWN; null never means zero. Also returns how many areas the plan allows and how many remain. Free of token charges.",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "areas": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "limits": {
          "type": "object"
        },
        "metering": {
          "type": "object"
        }
      },
      "required": [
        "areas"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "get_monitored_area",
    "description": "Fetch one monitored area with its full measurement history — every acquisition that was measured, its value, and whether it was flagged anomalous. This is the time series behind the number that list_monitored_areas reports, so use it to answer \"is it going up\", \"when did it change\", or \"how unusual is today\". Anomaly flags come from a median-absolute-deviation test on the series, not a fixed threshold. Free of token charges.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "area_id": {
          "type": "string",
          "description": "The area_id from list_monitored_areas. A metric’s polygon_id is also accepted and resolves to the same area."
        }
      },
      "required": [
        "area_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "area": {
          "type": "object"
        },
        "metering": {
          "type": "object"
        }
      },
      "required": [
        "area"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "create_monitored_area",
    "description": "Put a place under continuous satellite measurement: pick an area and what to count, and every new Sentinel-1 / Sentinel-2 / VIIRS acquisition over it is measured automatically from then on. Use this when the question is about a quantity at a fixed place over time (\"how many ships are alongside\", \"how much has burned\", \"is the water receding\") rather than about events, which is create_standing_order. Creating is free; each automatic check costs a small number of tokens only when it finds new imagery.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "The area to measure, [west, south, east, north] in WGS84. Must be under 5,000 km² — measurement is per-pixel over the area, so a country-sized box is rejected rather than silently sampled."
        },
        "metric": {
          "type": "string",
          "description": "What to count. Plain words work: ships, fires, vegetation, water, burn, snow, built_up, moisture, night_lights. Index names are also accepted: ship_detection, fire_count, ndvi, evi, savi, ndmi, ndwi, mndwi, ndbi, ndsi, nbr, dnb, vv, vh, rvi, rfdi, cr. The sensor is chosen from the metric."
        },
        "name": {
          "type": "string",
          "description": "Label for the area (default \"Monitored area\")."
        },
        "start_date": {
          "type": "string",
          "description": "YYYY-MM-DD to begin the history from. Defaults to 30 days ago — a longer backfill measures more scenes and therefore costs more on the first check."
        }
      },
      "required": [
        "bbox",
        "metric"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "area": {
          "type": "object"
        },
        "metering": {
          "type": "object"
        }
      },
      "required": [
        "area"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": false
    }
  }
] as const;

export const RESOURCES = [
  {
    "uri": "brief://latest",
    "name": "Daily World Brief (latest)",
    "description": "The most recent AI-synthesized Daily World Brief (JSON). Free.",
    "mimeType": "application/json"
  },
  {
    "uri": "signals://schema",
    "name": "Signal object schema",
    "description": "JSON Schema of the public Signal shape returned by query_signals / /api/v1/signals.",
    "mimeType": "application/json"
  },
  {
    "uri": "usage://current",
    "name": "API usage & quota",
    "description": "Remaining token balance and plan capabilities for the calling key. Free.",
    "mimeType": "application/json"
  },
  {
    "uri": "imagery://collections",
    "name": "Imagery collections",
    "description": "The satellite catalog collections searchable via search_imagery. Free.",
    "mimeType": "application/json"
  },
  {
    "uri": "status://current",
    "name": "Data freshness & pipeline status",
    "description": "How current the data is (ingestion/enrichment frontier), the Daily World Brief status, and an Operational/Delayed/Degraded roll-up. Free.",
    "mimeType": "application/json"
  }
] as const;

export const RESOURCE_TEMPLATES = [
  {
    "uriTemplate": "brief://{date}",
    "name": "Daily World Brief by date",
    "description": "The Daily World Brief for a specific UTC date (YYYY-MM-DD). Free.",
    "mimeType": "application/json"
  }
] as const;

export const PROMPTS = [
  {
    "name": "daily-situation-briefing",
    "description": "Summarize the current world situation from the Daily World Brief.",
    "arguments": [
      {
        "name": "date",
        "description": "UTC date YYYY-MM-DD (optional; defaults to latest).",
        "required": false
      }
    ]
  },
  {
    "name": "assess-top-signal",
    "description": "Find the highest-severity recent signal in an area/category and run an RS assessment.",
    "arguments": [
      {
        "name": "bbox",
        "description": "Bounding box \"minLon,minLat,maxLon,maxLat\" (optional).",
        "required": false
      },
      {
        "name": "category",
        "description": "Category filter (optional).",
        "required": false
      }
    ]
  },
  {
    "name": "aoi-watch",
    "description": "Scan an area of interest for recent escalations and recommend collection.",
    "arguments": [
      {
        "name": "bbox",
        "description": "Bounding box \"minLon,minLat,maxLon,maxLat\".",
        "required": true
      }
    ]
  },
  {
    "name": "market-exposure-check",
    "description": "Find recent events that could plausibly move a given market (oil, grain, shipping, ...) and explain each transmission channel. Informational only — not investment advice.",
    "arguments": [
      {
        "name": "market",
        "description": "Market to check: oil, natural_gas, grain, shipping, defense, metals, semiconductors, fx, equities.",
        "required": true
      },
      {
        "name": "days",
        "description": "Lookback window in days (optional; default 3).",
        "required": false
      }
    ]
  }
] as const;
