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

// Generated for Off-Nadir Delta MCP 1.31.0.

export const TOOLS = [
  {
    "name": "query_signals",
    "description": "Geolocated world events from global news media, AI-enriched with severity/GEOINT scores and collection recommendations.",
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
          "description": "[minLon, minLat, maxLon, maxLat] WGS84. Omit for worldwide."
        },
        "date": {
          "type": "string",
          "description": "Window end date, YYYY-MM-DD (UTC). Default today."
        },
        "days": {
          "type": "integer",
          "minimum": 1,
          "maximum": 30,
          "description": "Window length in days. Default 1."
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
          "description": "Restrict to these categories."
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
          "description": "Markets AI-tagged as exposed through a direct physical/supply channel."
        },
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 500,
          "description": "Max rows per page. Default 100."
        },
        "cursor": {
          "type": "string",
          "description": "Cursor from meta.next_cursor."
        },
        "minSeverity": {
          "type": "number",
          "minimum": 0,
          "maximum": 10,
          "description": "severity_score >= this (0-10)."
        },
        "escalating": {
          "type": "boolean",
          "description": "escalation_trend is \"escalating\"."
        },
        "sort": {
          "type": "string",
          "enum": [
            "severity",
            "recent",
            "sources",
            "geoint"
          ],
          "description": "\"geoint\" = collection_priority, NOT the saturated geoint_score."
        },
        "updatedSince": {
          "type": "string",
          "description": "Only signals (re)enriched at/after this ISO 8601 time. Ignores the date window."
        },
        "createdSince": {
          "type": "string",
          "description": "Only signals FIRST enriched at/after this ISO 8601 time."
        },
        "observability": {
          "type": "string",
          "enum": [
            "observable",
            "not-observable"
          ],
          "description": "Is a physical mark imageable at all."
        },
        "observabilityStatus": {
          "type": "string",
          "enum": [
            "observable",
            "not_observable",
            "insufficient_detail"
          ],
          "description": "3-state `observability`, adding `insufficient_detail`; neither bucket leaks it."
        },
        "openData": {
          "type": "string",
          "enum": [
            "sufficient",
            "commercial-recommended",
            "not-applicable"
          ],
          "description": "Free imagery enough vs commercial tasking recommended."
        },
        "minInformationGain": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "expected_information_gain >= this (0-1)."
        },
        "taskableOnly": {
          "type": "boolean",
          "description": "Coordinate is search_ready. GEOMETRY ONLY — for tasking use collectionReadyOnly."
        },
        "collectionReadyOnly": {
          "type": "boolean",
          "description": "Strict tasking candidates: search_ready AND observable AND quality!=failed AND a plan AND a coordinate."
        },
        "responseFormat": {
          "type": "string",
          "enum": [
            "concise",
            "detailed"
          ],
          "description": "\"detailed\" returns the full Signal (see signals://schema)."
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
    "description": "Roll-ups over the corpus: totals plus per-category and per-day breakdown. NOTE the unit — `total` counts article-deduped events, not clusters, so it is >= the query_signals count.",
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
          "description": "[minLon, minLat, maxLon, maxLat] WGS84. Omit for worldwide."
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
    "description": "Where activity concentrates: density grid-binned into ranked cells with peak severity, categories and representative event_ids. Cells count satellite-observable points.",
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
          "description": "[minLon, minLat, maxLon, maxLat] WGS84. Omit for worldwide."
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
          "description": "Source points sampled before binning — NOT the cell count. Default/max 500."
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
    "description": "The Daily World Brief — an AI digest of the previous UTC day. freshness.is_stale means no newer day is available yet, so relay it as possibly out of date.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "description": "YYYY-MM-DD (UTC). Default latest available."
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
    "description": "The calling key's remaining token balance and plan capabilities. Pre-flight a metered call with it.",
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
    "description": "Search the imagery catalog over an area and window. Metadata only, no pixels. eventDate tags each scene pre/post — **a same-day scene is same_day_unknown, never post** — and eventPoint/eventAoi add target_relation, so a scene that only clips the bbox is not read as covering the event.",
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
          "description": "[minLon, minLat, maxLon, maxLat] WGS84. Required."
        },
        "collection": {
          "type": "string",
          "enum": [
            "sentinel-1-grd",
            "sentinel-1-rtc",
            "sentinel-2-l2a",
            "NISAR_L2_GCOV_PROVISIONAL_V1"
          ],
          "description": "Catalog collection. Default sentinel-2-l2a."
        },
        "date": {
          "type": "string",
          "description": "Window end date, YYYY-MM-DD (UTC). Default today."
        },
        "days": {
          "type": "integer",
          "minimum": 1,
          "maximum": 30,
          "description": "Window length in days. Default 7."
        },
        "eventDate": {
          "type": "string",
          "description": "Widens the window to the canonical pre/post span and adds bracketing; sentinel-1-grd also gets sar_pair_status."
        },
        "eventPoint": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 2,
          "maxItems": 2,
          "description": "[lon, lat] WGS84. Drives covers_event_point / usable_for_event."
        },
        "eventAoi": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "[minLon,minLat,maxLon,maxLat]. Drives intersects_event_aoi / coverage_ratio."
        },
        "eventTimestamp": {
          "type": "string",
          "description": "ISO 8601 event time — promotes same-day scenes to pre/post."
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
          "description": "\"detailed\" adds footprint geometry, full target_relation, polarizations, orbit numbers, incidence."
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
    "description": "The deterministic imagery plan for ONE event: checks BOTH sensors exactly once — sentinel-1-grd (SAR, the only look that survives cloud and night) and sentinel-2-l2a — against the event footprint and a pre/post window. **A VHR recommendation never invalidates what the free catalog showed.**",
    "inputSchema": {
      "type": "object",
      "properties": {
        "event_id": {
          "type": "integer",
          "description": "The `id` from query_signals; the server resolves its point and AOI."
        },
        "analysis_goal": {
          "type": "string",
          "enum": [
            "damage_assessment",
            "flood_mapping",
            "wildfire_assessment"
          ],
          "description": "What the imagery must establish — decides the lead collection and cloud gating."
        },
        "event_date": {
          "type": "string",
          "description": "YYYY-MM-DD. The event row supplies it when known."
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
    "description": "WHERE, and with what class of satellite, observation is most worthwhile now: composite IMPORTANCE crossed with the SPEC CLASS the required resolution demands — coarse, hr (free Sentinel-class) or vhr. Deterministic.",
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
          "description": "[west, south, east, north] WGS84. Omit for global."
        },
        "start_date": {
          "type": "string",
          "description": "YYYY-MM-DD, inclusive. Default today; no plan history floor here."
        },
        "end_date": {
          "type": "string",
          "description": "YYYY-MM-DD, inclusive. Default today; capped at 30 days."
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
    "description": "Which events a sensor can actually RESOLVE, over the FULL set. **The population is ungated by tasking readiness**, so its total sits above rank_imaging_priority and counts a different unit from query_signals clusters.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "sensor": {
          "type": "string",
          "enum": [
            "sentinel-2",
            "sentinel-1"
          ],
          "description": "sentinel-2 = ~10 m optical (needs daylight and clear sky); sentinel-1 = SAR."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "[west, south, east, north] WGS84. Omit for global."
        },
        "start_date": {
          "type": "string",
          "description": "YYYY-MM-DD, inclusive. Default today; no plan history floor here."
        },
        "end_date": {
          "type": "string",
          "description": "YYYY-MM-DD, inclusive. Default today; capped at 30 days."
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
    "description": "WHEN a place can next be imaged and by WHAT: 13 free-systematic and commercial-taskable families. **Every pass is a GEOMETRIC access opportunity** — no operator plan is consulted. retrieval_ok:false means timing is UNAVAILABLE, never \"no passes\".",
    "inputSchema": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90,
          "description": "Target latitude. Required unless bbox is given."
        },
        "lon": {
          "type": "number",
          "minimum": -180,
          "maximum": 180,
          "description": "Target longitude. Required unless bbox is given."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "[west, south, east, north] WGS84. Its CENTRE is the target if lat/lon are omitted."
        },
        "start_date": {
          "type": "string",
          "description": "YYYY-MM-DD (UTC), inclusive. Default today."
        },
        "end_date": {
          "type": "string",
          "description": "YYYY-MM-DD (UTC), inclusive. Default start+2 days; 7-day horizon."
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
              "skysat",
              "umbra",
              "synspective",
              "iqps",
              "radarsat-2",
              "cosmo-skymed",
              "nisar"
            ]
          },
          "description": "Families to consider. Omit for all thirteen."
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
    "description": "AI remote-sensing deep-dive for one signal: what to observe, sensors, a collection window. Also returns a deterministic `context` whose `imagery_handoff.parameters` are the exact search_imagery inputs. Cached per signal; not-observable signals are rejected before any charge.",
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
          "type": "string",
          "description": "Assessment depth actually run (\"quick\" | \"deep\")."
        },
        "cached": {
          "type": "boolean",
          "description": "True when a prior assessment for this signal was reused (no re-charge)."
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
        },
        "context": {
          "type": "object",
          "description": "Deterministic collection context for this signal — not model prose. Use `imagery_handoff` to go straight from the assessment to real scene candidates.",
          "properties": {
            "event_id": {
              "type": "integer"
            },
            "event_date": {
              "type": [
                "string",
                "null"
              ]
            },
            "category": {
              "type": [
                "string",
                "null"
              ]
            },
            "target": {
              "type": [
                "string",
                "null"
              ],
              "description": "Normalized observation target."
            },
            "location": {
              "type": [
                "string",
                "null"
              ]
            },
            "aoi_bbox": {
              "type": [
                "array",
                "null"
              ],
              "items": {
                "type": "number"
              },
              "minItems": 4,
              "maxItems": 4,
              "description": "Event AOI [minLon, minLat, maxLon, maxLat] (WGS84), or null when unresolved."
            },
            "point": {
              "type": [
                "object",
                "null"
              ],
              "description": "{ lat, lng } of the event, or null."
            },
            "satellite_observability": {
              "type": "string",
              "enum": [
                "observable",
                "not-observable",
                "insufficient-detail"
              ]
            },
            "quality_status": {
              "type": "string",
              "description": "Cross-field consistency verdict for the signal row."
            },
            "rs_level": {
              "type": [
                "string",
                "null"
              ]
            },
            "rs_sensor": {
              "type": [
                "string",
                "null"
              ]
            },
            "signal_verification": {
              "type": "object"
            },
            "verification_reconciliation": {
              "type": [
                "object",
                "null"
              ]
            },
            "collection_plan": {
              "type": "object"
            },
            "claim_test": {
              "type": [
                "object",
                "null"
              ]
            },
            "imagery_handoff": {
              "type": "object",
              "description": "How to turn this assessment into a real scene search.",
              "properties": {
                "tool": {
                  "type": "string",
                  "description": "Always \"search_imagery\"."
                },
                "handoff_mode": {
                  "type": "string",
                  "enum": [
                    "targeted_collection",
                    "wide_area_screening",
                    "multi_aoi_collection",
                    "blocked"
                  ]
                },
                "target_specificity": {
                  "type": "string",
                  "enum": [
                    "point_or_aoi",
                    "multi_region",
                    "unresolved"
                  ]
                },
                "parameters": {
                  "type": "object",
                  "description": "Pass straight to search_imagery — these keys ARE its input-schema keys, no renaming.",
                  "properties": {
                    "bbox": {
                      "type": [
                        "array",
                        "null"
                      ],
                      "items": {
                        "type": "number"
                      },
                      "minItems": 4,
                      "maxItems": 4
                    },
                    "eventDate": {
                      "type": [
                        "string",
                        "null"
                      ]
                    },
                    "eventPoint": {
                      "type": [
                        "array",
                        "null"
                      ],
                      "items": {
                        "type": "number"
                      },
                      "minItems": 2,
                      "maxItems": 2,
                      "description": "[lon, lat]."
                    },
                    "eventAoi": {
                      "type": [
                        "array",
                        "null"
                      ],
                      "items": {
                        "type": "number"
                      },
                      "minItems": 4,
                      "maxItems": 4
                    },
                    "eventTimestamp": {
                      "type": [
                        "string",
                        "null"
                      ]
                    }
                  }
                },
                "missing_parameters": {
                  "type": "array",
                  "description": "Parameters that could not be filled, each with why — so the gap is legible.",
                  "items": {
                    "type": "object",
                    "properties": {
                      "field": {
                        "type": "string"
                      },
                      "reason": {
                        "type": "string"
                      }
                    }
                  }
                },
                "note": {
                  "type": "string"
                }
              },
              "required": [
                "tool",
                "handoff_mode",
                "parameters"
              ]
            }
          },
          "required": [
            "event_id",
            "satellite_observability",
            "imagery_handoff"
          ]
        },
        "status": {
          "type": "string",
          "enum": [
            "not_observable",
            "needs_repair"
          ],
          "description": "Present ONLY on a pre-charge rejection; `content` and `meta` are then absent."
        },
        "event_id": {
          "type": "integer",
          "description": "Echoed on a rejection so the caller can tell which signal it was."
        },
        "charged": {
          "type": "integer",
          "description": "Tokens charged on a rejection — always 0."
        },
        "reason": {
          "type": "string",
          "description": "Why the signal was rejected before any charge."
        },
        "reason_codes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": []
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
    "description": "Ask the Delta Analyst an OSINT/GEOINT question; returns a structured brief. **Durable async**: {status:\"processing\", job_id} comes back immediately and the run finishes in a background worker. Fetch with get_analyst_job, or re-send the SAME idempotencyKey (no second charge).",
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
          "description": "Focus bbox [minLon, minLat, maxLon, maxLat] WGS84."
        },
        "mode": {
          "type": "string",
          "enum": [
            "fast",
            "deep"
          ],
          "description": "fast (default) or deep. Deep widens reasoning and gathering: slower, ceiling 123→415, still charged by usage."
        },
        "idempotencyKey": {
          "type": "string",
          "description": "At-most-once key. Re-sending the SAME key returns the SAME run with no second charge, so a timeout is recoverable."
        },
        "response_format": {
          "type": "string",
          "enum": [
            "full",
            "compact"
          ],
          "description": "\"compact\" drops the prose brief, returning only the structured result."
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
    "description": "Status and result of an ask_analyst run. Status is \"processing\", \"done\" or \"error\"; result_quality.status is **SEPARATE** — a done job can carry a partial result.",
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
          "description": "\"compact\" drops the prose brief and returns only the structured result."
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
    "description": "The ledger of claims this key was given, each with its evidence class, independent source families and publishers. The point is the time axis: a restated assertion links to the earlier one and says which way the evidence moved.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "since": {
          "type": "string",
          "description": "Only claims asserted on/after this date."
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
        "event_id": {
          "type": "number",
          "description": "Only claims about this event. If neither anchor resolves, `event_link.linked` says so."
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
        },
        "event_link": {
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
    "name": "test_hypotheses",
    "description": "Given competing statements, the observation that would REFUTE the most — and those that would refute none. **The logic runs one way**: an ABSENT observable refutes every statement requiring it; a PRESENT one refutes nothing.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "hypotheses": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 2,
          "maxItems": 8,
          "description": "Two to eight competing statements, one assertion each (<=500 chars)."
        },
        "mode": {
          "type": "string",
          "enum": [
            "competing",
            "joint"
          ],
          "description": "`competing` (default): an observable required by ALL is useless. `joint`: one required by all is BEST."
        },
        "event_id": {
          "type": "number",
          "description": "Test the standing claims about this event; restated claims are excluded."
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
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "hypotheses": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "best": {
          "type": "object"
        },
        "discriminators": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "no_diagnostic_value": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "undecomposable": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "no_discriminator_reason": {
          "type": "string"
        },
        "note": {
          "type": "string"
        }
      },
      "required": [
        "summary",
        "discriminators",
        "note"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "query_developments",
    "description": "What actually CHANGED about the events in an area, not which articles are new. Each change is labelled `world` (the event's own state moved) or `measurement` (what we can see moved).",
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
          "description": "[minLon, minLat, maxLon, maxLat]. Omit for worldwide."
        },
        "date": {
          "type": "string",
          "description": "End of the window (YYYY-MM-DD). Defaults to today."
        },
        "days": {
          "type": "number",
          "minimum": 1,
          "maximum": 30,
          "description": "Window length ending at `date` (default 7)."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Restrict to these signal categories."
        },
        "development_types": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "new_event",
              "baseline",
              "occurrence_time_established",
              "casualty_count_first_reported",
              "casualty_count_raised",
              "casualty_count_corrected",
              "casualties_disputed",
              "attribution_stated",
              "attribution_changed",
              "attribution_disputed",
              "corroboration_increased",
              "severity_escalated",
              "location_resolved",
              "observability_established",
              "collection_ready",
              "imagery_available",
              "sar_pair_ready",
              "observed",
              "confirmed",
              "reporting_disputed",
              "retracted"
            ]
          },
          "description": "Restrict to these kinds of change. An unknown value is an error, not an empty result."
        },
        "notable_only": {
          "type": "boolean",
          "description": "Default true. False returns every recorded change."
        },
        "limit": {
          "type": "number",
          "minimum": 1,
          "maximum": 200,
          "description": "How many developments to return (default 50)."
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
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "developments": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "required": [
        "developments"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "get_event_thread",
    "description": "One event end to end: state plus every change in order — the \"new event or update\" distinction a feed cannot make. `occurred_at_basis` distinguishes stated, absent and never measured.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "event_id": {
          "type": "number",
          "description": "Any signal id in the event; the canonical event is returned."
        }
      },
      "required": [
        "event_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "canonical_event": {
          "type": "object"
        },
        "timeline": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "sources": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "required": [
        "canonical_event",
        "timeline"
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
    "description": "Put an area under CONTINUOUS watch: a question plus a bbox, re-answered on a schedule, notifying only when the answer changed. **Cost is per CHANGE, not per check.**",
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
          "description": "[west, south, east, north] WGS84. Required — a global order would fire on everything."
        },
        "question": {
          "type": "string",
          "description": "Omit for \"what changed in this area, and what does it mean?\"."
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
          "description": "How often to CHECK (checking is free). Default weekly; faster may need a higher plan."
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Restrict the watch to these Delta categories."
        },
        "min_geoint_score": {
          "type": "number",
          "description": "Reporting bar (0-10, default 6)."
        },
        "min_new_events": {
          "type": "number",
          "description": "New qualifying events needed to trigger a run (default 1)."
        },
        "notify_email": {
          "type": "boolean",
          "description": "Email on fire (default true); readable via list_standing_orders anyway."
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
        "projected_monthly_tokens_typical": {
          "type": "number"
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
    "name": "list_layer_sets",
    "description": "The layer sets saved on this account. The layer tree itself is not returned: it is an internal format, and opening it is the map's job.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Max layer sets to return (default 50)."
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
        "layer_sets": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "total": {
          "type": "integer"
        }
      },
      "required": [
        "layer_sets"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "get_layer_set",
    "description": "One saved layer set by id. The serialized layer tree is deliberately not exposed — an internal representation, not a public contract.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "layer_set_id": {
          "type": "string",
          "description": "The layer set id."
        }
      },
      "required": [
        "layer_set_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "layer_set": {
          "type": "object"
        }
      },
      "required": [
        "layer_set"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "list_uploaded_layers",
    "description": "The data this account uploaded to the map, plus the formats the uploader accepts. Uploading happens in the app; GeoJSON and GeoTIFF only.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Max uploads to return (default 50)."
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
        "uploads": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "total": {
          "type": "integer"
        },
        "accepted_formats": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "uploads"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "list_standing_orders",
    "description": "The standing orders on this key: cadence, area, last check, last actual fire, and quiet_checks — a high quiet_checks means the watch is not earning its place.",
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
    "description": "Delete a standing order, or pause/resume with active=false/true. A paused order still counts against the plan limit.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "order_id": {
          "type": "string",
          "description": "From create_standing_order or list_standing_orders."
        },
        "active": {
          "type": "boolean",
          "description": "Omit to DELETE. false pauses, true resumes."
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
    "description": "Places under continuous satellite measurement: metric, latest value, change, anomaly flag, coverage. **coverage.window_total is null when the catalog total is UNKNOWN; null never means zero.**",
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
    "description": "One monitored area with its full measurement history. Anomaly flags come from a median-absolute-deviation test, not a fixed threshold. Needs a plan that includes data export.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "area_id": {
          "type": "string",
          "description": "From list_monitored_areas; a metric's polygon_id also resolves."
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
    "description": "Put a place under continuous satellite measurement — every new Sentinel-1/2 or VIIRS acquisition is measured. For a QUANTITY at a fixed place; for events use create_standing_order.",
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
          "description": "[west, south, east, north] WGS84, under 5,000 km² — a larger box is rejected, not sampled."
        },
        "metric": {
          "type": "string",
          "description": "Plain words (ships, fires, vegetation, water, burn, snow, built_up, moisture, night_lights) or index ids (ndvi, ndwi, nbr, vv, vh …). The sensor follows."
        },
        "name": {
          "type": "string",
          "description": "Label for the area (default \"Monitored area\")."
        },
        "start_date": {
          "type": "string",
          "description": "YYYY-MM-DD to backfill from. Default 30 days ago; longer costs more on the first check."
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
  },
  {
    "name": "list_watches",
    "description": "The Watchlist as one list, each entry with a state bucket. `updated_since` returns only watches whose CONTENT changed after that instant — what a synchronised copy should poll.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "updated_since": {
          "type": "string",
          "description": "ISO 8601. Only watches whose CONTENT changed after it — the evidence, not renames."
        },
        "cursor": {
          "type": "string",
          "description": "Cursor from meta.next_cursor."
        },
        "limit": {
          "type": "integer",
          "description": "Watches per page when paging (1..500, default 100).",
          "minimum": 1,
          "maximum": 500
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
        "watches": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "buckets": {
          "type": "object"
        },
        "limits": {
          "type": "object"
        },
        "meta": {
          "type": "object"
        }
      },
      "required": [
        "watches"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "get_watch",
    "description": "One watch end to end: target, state, latest change, measurements with recent series, standing-order questions, and for an event watch its verification state, developments and thread, plus this account's notes.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "watch_id": {
          "type": "string",
          "description": "Id from list_watches."
        },
        "include_passes": {
          "type": "boolean",
          "description": "Add the collection outlook. Costs the same as predict_satellite_passes; omit it and the call is free."
        }
      },
      "required": [
        "watch_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "watch": {
          "type": "object"
        },
        "thread": {
          "type": "object"
        }
      },
      "required": [
        "watch"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "get_decision_package",
    "description": "Everything needed to decide what to collect next about one watch, in one object. **Only `absent` asserts a negative** — `inconclusive` means imagery could not answer, `not_collected` means no valid look happened. `revision` is a content hash.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "watch_id": {
          "type": "string",
          "description": "Id from list_watches."
        }
      },
      "required": [
        "watch_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "schema_version": {
          "type": "string"
        },
        "package_id": {
          "type": "string"
        },
        "external_key": {
          "type": "string"
        },
        "revision": {
          "type": "string"
        },
        "generated_at": {
          "type": "string"
        },
        "watch": {
          "type": "object"
        },
        "target": {
          "type": "object"
        },
        "current_state": {
          "type": "object"
        },
        "claims": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "discriminators": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "no_diagnostic_value": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "undecomposable": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "no_discriminator_reason": {
          "type": "string"
        },
        "collection_options": {
          "type": "object"
        },
        "observations": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "negative_evidence": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "assessments": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "limitations": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "note": {
          "type": "string"
        }
      },
      "required": [
        "summary",
        "revision",
        "negative_evidence",
        "limitations",
        "note"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
    }
  },
  {
    "name": "create_watch",
    "description": "Add a target to the Watchlist. EVENT: pass the signal's event id and the server binds the canonical event — **never watch an article URL**. AREA: pass a bbox.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "target_type": {
          "type": "string",
          "enum": [
            "event",
            "area"
          ],
          "description": "Kind of target."
        },
        "event_id": {
          "type": "number",
          "description": "Signal event id (required for target_type \"event\")."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "[west, south, east, north] WGS84 (required for target_type \"area\")."
        },
        "name": {
          "type": "string",
          "description": "Label (defaults from the target)."
        },
        "notify_email": {
          "type": "boolean",
          "description": "Email on meaningful changes (default false)."
        },
        "imagery_alerts": {
          "type": "boolean",
          "description": "AREA only: tell me when a new scene covers it."
        }
      },
      "required": [
        "target_type"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "watch": {
          "type": "object"
        },
        "already_existed": {
          "type": "boolean"
        }
      },
      "required": [
        "watch"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "update_watch",
    "description": "Rename, pause or resume a watch. **Pausing is not a display state**: monitored areas stop being measured and charged, standing orders stop checking.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "watch_id": {
          "type": "string",
          "description": "Id from list_watches."
        },
        "name": {
          "type": "string",
          "description": "New label."
        },
        "status": {
          "type": "string",
          "enum": [
            "active",
            "paused",
            "saved"
          ],
          "description": "\"paused\" stops the bound checks; \"active\" resumes them."
        },
        "notify_email": {
          "type": "boolean",
          "description": "Email on changes."
        },
        "imagery_alerts": {
          "type": "boolean",
          "description": "AREA only: tell me when a new scene covers it."
        }
      },
      "required": [
        "watch_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "watch": {
          "type": "object"
        }
      }
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "delete_watch",
    "description": "Delete a watch and its underlying resources — bound monitored areas with their history, and standing orders. To stop without losing them, pause with update_watch.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "watch_id": {
          "type": "string",
          "description": "Id from list_watches."
        }
      },
      "required": [
        "watch_id"
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
        "removed": {
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
    "name": "add_note",
    "description": "Add a note to a watch, start a thread, or reply. **Confidence is what separates a note from a judgment**: with one it is a JUDGMENT that supersedes the previous judgment rather than overwriting it.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "watch_id": {
          "type": "string",
          "description": "Id from list_watches."
        },
        "note": {
          "type": "string",
          "description": "What you want kept with this watch."
        },
        "title": {
          "type": "string",
          "description": "A heading makes it a thread. A reply cannot have one."
        },
        "parent_id": {
          "type": "string",
          "description": "Reply to this note id. One level deep."
        },
        "confidence": {
          "type": "string",
          "enum": [
            "high",
            "moderate",
            "low"
          ],
          "description": "How sure the judgment is — about the evidence, not the event. Omit and it stays a note."
        },
        "likelihood": {
          "type": "string",
          "enum": [
            "very unlikely",
            "unlikely",
            "roughly even chance",
            "likely",
            "very likely",
            "almost certain"
          ],
          "description": "How probable the thing itself is (ICD 203). Omit rather than guess."
        },
        "gaps": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "What would change this judgment. Only meaningful with a confidence."
        },
        "next_check": {
          "type": "string",
          "description": "When/what to look at next."
        }
      },
      "required": [
        "watch_id",
        "note"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "note": {
          "type": "object"
        }
      },
      "required": [
        "note"
      ]
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "delete_note",
    "description": "Delete one note from a watch. The deletion itself stays in the account's action log.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "watch_id": {
          "type": "string",
          "description": "Id from list_watches."
        },
        "note_id": {
          "type": "string",
          "description": "Note id from get_watch."
        }
      },
      "required": [
        "watch_id",
        "note_id"
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
    "name": "search_entities",
    "description": "Find a place in the location registry — ports, bases, airfields, power plants, chokepoints, named seas. Matches the registry's own names and aliases. At most 50 rows.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Name or partial name (at least 2 characters)."
        },
        "subtypes": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "port_facility",
              "military_base",
              "airport",
              "refinery_energy",
              "chokepoint",
              "water_body"
            ]
          },
          "description": "Restrict to these kinds of place. Omit for all."
        },
        "limit": {
          "type": "number",
          "description": "Max rows (1-50, default 20)."
        }
      },
      "required": [
        "query"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "entities": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "limit": {
          "type": "number"
        }
      },
      "required": [
        "entities"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "get_entity",
    "description": "What has happened at one place: the registry record plus every linked event with HOW it was linked. **Read the basis: `geo_proximity` is an association, not a statement that the event happened there.**",
    "inputSchema": {
      "type": "object",
      "properties": {
        "entity_id": {
          "type": "string",
          "description": "The id from search_entities."
        }
      },
      "required": [
        "entity_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "entity": {
          "type": "object"
        },
        "events": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "link_basis_counts": {
          "type": "object"
        },
        "event_count": {
          "type": "number"
        },
        "claim_count": {
          "type": "number"
        },
        "observability": {
          "type": "object"
        }
      },
      "required": [
        "entity"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "get_related_events",
    "description": "What else connects to one event, and what came before and after. Every `related` entry NAMES what the two share; **merely-nearby events are in `context` and claim nothing**. `insights.development` asserts sequence, never cause.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "event_id": {
          "type": "number",
          "description": "The signal id to anchor on."
        },
        "max_hop": {
          "type": "number",
          "minimum": 1,
          "maximum": 10,
          "description": "Shared-name hops (default 5); 1 = direct only. Sets the charge CEILING (3 + max_hop - 1, capped 8), not the charge."
        },
        "include_hypotheses": {
          "type": "boolean",
          "description": "Ask what COULD connect the `context` events. ICD 203 word, never a number; each states what would REFUTE it. Empty is normal; omit = no model."
        }
      },
      "required": [
        "event_id"
      ]
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "anchor": {
          "type": "object"
        },
        "entities": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "related": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "context": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "hypotheses": {
          "type": "object"
        },
        "network": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "nearby_facilities": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "assessment": {
          "type": "object"
        },
        "insights": {
          "type": "object"
        },
        "accounting": {
          "type": "object"
        },
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        }
      },
      "required": [
        "related"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "lookup_elevation",
    "description": "Terrain height from the Copernicus DEM GLO-30 for a point, bbox or polygon, with relief — the number that governs SAR layover and shadow. A SURFACE model; `covered: false` is no data, not 0 m. Cite the `attribution`.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90,
          "description": "Latitude of a single point to measure (use with lon)."
        },
        "lon": {
          "type": "number",
          "minimum": -180,
          "maximum": 180,
          "description": "Longitude of a single point to measure (use with lat)."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "[lon_min, lat_min, lon_max, lat_max] WGS84."
        },
        "polygon": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            },
            "minItems": 2,
            "maxItems": 2
          },
          "minItems": 3,
          "description": "WGS84 ring [[lon, lat], …]. Statistics cover only the samples inside it."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "mode": {
          "type": "string",
          "description": "Which form was measured: 'point', 'bbox' or 'polygon'."
        },
        "elevation": {
          "type": "object"
        },
        "attribution": {
          "type": "string",
          "description": "Required Copernicus DEM credit (licence Article 6(b))."
        }
      },
      "required": [
        "elevation"
      ]
    },
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false
    }
  },
  {
    "name": "analyze_terrain",
    "description": "Compute FROM the terrain. `sar_geometry` returns layover, shadow, foreshortening and mean LOCAL incidence — **required, not assumed, because it changes with pass direction**. `profile` returns ground along a line and a line-of-sight verdict. Cite the `attribution`.",
    "inputSchema": {
      "type": "object",
      "required": [
        "operation"
      ],
      "properties": {
        "operation": {
          "type": "string",
          "enum": [
            "sar_geometry",
            "profile"
          ],
          "description": "'sar_geometry' = layover/shadow over an area; 'profile' = ground along a line + line-of-sight."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "For 'sar_geometry': [lon_min, lat_min, lon_max, lat_max] WGS84."
        },
        "incidence_deg": {
          "type": "number",
          "minimum": 10,
          "maximum": 80,
          "description": "For 'sar_geometry'. Sentinel-1 IW spans ~29-46°."
        },
        "look_azimuth_deg": {
          "type": "number",
          "minimum": 0,
          "maximum": 360,
          "description": "For 'sar_geometry': bearing along ground range. Right-looking descending ≈ 270."
        },
        "lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90,
          "description": "For 'profile': latitude of the observer end."
        },
        "lon": {
          "type": "number",
          "minimum": -180,
          "maximum": 180,
          "description": "For 'profile': longitude of the observer end."
        },
        "to_lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90,
          "description": "For 'profile': latitude of the far end."
        },
        "to_lon": {
          "type": "number",
          "minimum": -180,
          "maximum": 180,
          "description": "For 'profile': longitude of the far end."
        },
        "observer_height_m": {
          "type": "number",
          "minimum": 0,
          "description": "For 'profile': eye height above ground, default 2 m."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "operation": {
          "type": "string"
        },
        "sar_geometry": {
          "type": "object"
        },
        "profile": {
          "type": "object"
        },
        "attribution": {
          "type": "string",
          "description": "Required Copernicus DEM credit (licence Article 6(b))."
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
    "name": "refine_location",
    "description": "Research one signal's location further and store a better coordinate if the sources genuinely narrow it. **Charged only if the precision improves.** `improved: false` is the common CORRECT outcome, not worth retrying.",
    "inputSchema": {
      "type": "object",
      "required": [
        "signal_id"
      ],
      "properties": {
        "signal_id": {
          "type": "integer",
          "description": "The signal (global_event_id) to research further."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "result": {
          "type": "object"
        },
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
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
    "name": "measure_index_series",
    "description": "Measure a spectral index over an area scene by scene through the Sentinel-2 archive. **Call `estimate_only: true` first** — free, and returns the scene count, real date span and cost. At most 24 scenes, so a longer period is a SAMPLE. Cite the `attribution`.",
    "inputSchema": {
      "type": "object",
      "required": [
        "index",
        "start",
        "end"
      ],
      "properties": {
        "polygon": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "description": "WGS84 ring [[lon, lat], …], 3+ vertices. Statistics cover the samples inside it."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "Alternative to polygon: [lon_min, lat_min, lon_max, lat_max] WGS84."
        },
        "index": {
          "type": "string",
          "enum": [
            "ndvi",
            "evi",
            "savi",
            "ndmi",
            "ndwi",
            "mndwi",
            "ndbi",
            "ndsi",
            "nbr",
            "iron-oxide",
            "clay",
            "ferrous"
          ],
          "description": "Which optical index to measure."
        },
        "start": {
          "type": "string",
          "description": "YYYY-MM-DD (UTC). Clamped forward to 2015-06-27 if earlier."
        },
        "end": {
          "type": "string",
          "description": "End date YYYY-MM-DD (UTC)."
        },
        "max_scenes": {
          "type": "integer",
          "minimum": 1,
          "maximum": 24,
          "description": "Cap on scenes measured in this call. Server maximum 24."
        },
        "max_cloud_cover": {
          "type": "number",
          "minimum": 1,
          "maximum": 100,
          "description": "Scene cloud-cover ceiling in percent. Default 30."
        },
        "estimate_only": {
          "type": "boolean",
          "description": "True = free: scene count, date span and cost, without measuring."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "estimate": {
          "type": "object"
        },
        "series": {
          "type": "object"
        },
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        },
        "attribution": {
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
    "name": "detect_ships",
    "description": "Count vessel-like targets in ONE Sentinel-1 SAR scene by CFAR detection — radar sees through cloud and at night. **Read `caveats` before reporting the number**: land mask, offshore exclusion and partial coverage change what it means.",
    "inputSchema": {
      "type": "object",
      "required": [
        "collection",
        "item_id"
      ],
      "properties": {
        "collection": {
          "type": "string",
          "enum": [
            "sentinel-1-grd",
            "sentinel-1-rtc"
          ],
          "description": "Collection of the scene. NISAR detection is app-only."
        },
        "item_id": {
          "type": "string",
          "description": "STAC item id from search_imagery."
        },
        "bbox": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "minItems": 4,
          "maxItems": 4,
          "description": "[lon_min, lat_min, lon_max, lat_max] WGS84, within the scene."
        },
        "geometry": {
          "type": "object"
        },
        "algorithm_version": {
          "type": "string",
          "enum": [
            "auto",
            "v2",
            "v3"
          ],
          "description": "'auto' (default) picks the recommended version for the sensor."
        }
      }
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string",
          "description": "One-line natural-language summary of the result, ready to relay to a user."
        },
        "count": {
          "type": "integer",
          "description": "Vessel-like targets detected. Read `caveats` before quoting it."
        },
        "ships": {
          "type": "object"
        },
        "caveats": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "scene": {
          "type": "object"
        },
        "processing": {
          "type": "object"
        },
        "meta": {
          "type": "object",
          "description": "Query echo, token charge/balance (meta.tokens), and pagination where applicable."
        }
      }
    },
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true
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
    "description": "The satellite catalog collections searchable via search_imagery — Sentinel-1 C-band SAR, Sentinel-2 optical, and NISAR L-band SAR (provisional calibration). Free.",
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
  },
  {
    "uriTemplate": "watch://{watch_id}",
    "name": "One watch, end to end",
    "description": "A Watchlist entry with its current state, latest meaningful change, measurements, (for event watches) the full event thread, and the notes kept against it. The same body get_watch returns. Free.",
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
