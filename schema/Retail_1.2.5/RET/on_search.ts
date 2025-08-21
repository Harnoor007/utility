export const onSearchSchema = {
  type: 'object',
  properties: {
    context: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          minLength: 1,
        },
        action: {
          type: 'string',
          const: 'on_search',
        },
        country: {
          type: 'string',
          const: 'IND',
        },
        city: {
          type: 'string',
          minLength: 1,
          not: {
            type: 'string',
            pattern: '\\*',
          },
          errorMessage: `City Code can't be * for on_search request`,
        },
        core_version: {
          type: 'string',
          const: '1.2.5',
          minLength: 1,
        },
        bap_id: {
          type: 'string',
          minLength: 1,
        },
        bap_uri: {
          type: 'string',
          minLength: 1,
          format: 'url',
        },
        bpp_id: {
          type: 'string',
        },
        bpp_uri: {
          type: 'string',
          format: 'url',
        },
        transaction_id: {
          type: 'string',
          minLength: 1,
        },
        message_id: {
          type: 'string',
          minLength: 1,
        },
        timestamp: {
          type: 'string',
          format: 'rfc3339-date-time',
          errorMessage: 'Time must be RFC3339 UTC timestamp format.',
        },
        ttl: {
          type: 'string',
          format: 'duration',
          errorMessage: 'Duration must be RFC3339 duration.',
        },
      },
      required: [
        'domain',
        'country',
        'city',
        'action',
        'core_version',
        'bap_id',
        'bap_uri',
        'bpp_id',
        'bpp_uri',
        'transaction_id',
        'message_id',
        'timestamp',
      ],
      additionalProperties: false,
    },
    message: {
      type: 'object',
      properties: {
        catalog: {
          type: 'object',
          properties: {
            'bpp/fulfillments': {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  type: {
                    type: 'string',
                    enum: ['Delivery', 'Self-Pickup', 'Buyer-Delivery'],
                  },
                },
                required: ['id', 'type'],
              },
            },
            'bpp/descriptor': {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                symbol: {
                  type: 'string',
                },
                short_desc: {
                  type: 'string',
                },
                long_desc: {
                  type: 'string',
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'string',
                    pattern: '^$|^https?:\\/\\/[^\\s]*',
                    errorMessage: 'descriptor/images should be URLs or empty strings',
                  },
                },
                tags: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      code: {
                        type: 'string',
                        enum: ['bpp_terms'],
                      },
                      list: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            code: {
                              type: 'string',
                              enum: ['np_type', 'accept_bap_terms', 'collect_payment'],
                            },
                            value: {
                              type: 'string',
                            },
                          },
                          required: ['code', 'value'],
                          additionalProperties: false,
                        },
                        minItems: 1,
                      },
                    },
                    required: ['code', 'list'],
                    additionalProperties: false,
                  },
                },
              },
              required: ['name', 'symbol', 'short_desc', 'long_desc'],
              additionalProperties: true,
            },
            'bpp/providers': {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  rating: {
                    type: 'string',
                    enum: ['1', '2', '3', '4', '5'],
                  },
                  time: {
                    type: 'object',
                    properties: {
                      label: {
                        type: 'string',
                        enum: ['enable', 'disable'],
                      },
                      timestamp: {
                        type: 'string',
                        format: 'rfc3339-date-time',
                      },
                    },
                    required: ['label', 'timestamp'],
                  },
                  fulfillments: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                        },
                        type: {
                          type: 'string',
                        },
                        contact: {
                          type: 'object',
                          properties: {
                            phone: {
                              type: 'string',
                              minLength: 10,
                              maxLength: 11,
                            },
                            email: {
                              type: 'string',
                              format: 'email',
                            },
                          },
                          required: ['phone', 'email'],
                        },
                      },
                      required: ['id', 'type', 'contact'],
                    },
                  },
                  descriptor: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                      symbol: {
                        type: 'string',
                      },
                      short_desc: {
                        type: 'string',
                      },
                      long_desc: {
                        type: 'string',
                      },
                      images: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                    },
                    required: ['name', 'symbol', 'short_desc', 'long_desc', 'images'],
                  },
                  ttl: {
                    type: 'string',
                    format: 'duration',
                    errorMessage: 'Duration must be RFC3339 duration.',
                  },
                  locations: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                        },
                        time: {
                          type: 'object',
                          properties: {
                            label: {
                              type: 'string',
                              enum: ['enable', 'disable', 'open', 'close'],
                            },
                            timestamp: {
                              type: 'string',
                              format: 'rfc3339-date-time',
                            },
                            days: {
                              type: 'string',
                            },
                            schedule: {
                              type: 'object',
                              properties: {
                                holidays: {
                                  type: 'array',
                                  items: {
                                    type: 'string',
                                    format: 'date',
                                  },
                                },
                                frequency: {
                                  type: 'string',
                                },
                                times: {
                                  type: 'array',
                                  minItems: 1,
                                  items: {
                                    type: 'string',
                                    minLength: 4,
                                    maxLength: 4,
                                  },
                                },
                              },
                              required: ['holidays'],
                            },
                            range: {
                              type: 'object',
                              properties: {
                                start: {
                                  type: 'string',
                                },
                                end: {
                                  type: 'string',
                                },
                              },
                              required: ['start', 'end'],
                            },
                          },
                          required: ['label', 'timestamp', 'schedule'],
                        },
                        gps: {
                          type: 'string',
                        },
                        address: {
                          type: 'object',
                          properties: {
                            locality: {
                              type: 'string',
                            },
                            street: {
                              type: 'string',
                            },
                            city: {
                              type: 'string',
                            },
                            area_code: {
                              type: 'string',
                              minLength: 6,
                              maxLength: 6,
                            },
                            state: {
                              type: 'string',
                            },
                          },
                          required: ['locality', 'street', 'city', 'area_code', 'state'],
                          additionalProperties: false,
                        },
                        circle: {
                          type: 'object',
                          properties: {
                            gps: {
                              type: 'string',
                            },
                            radius: {
                              type: 'object',
                              properties: {
                                unit: {
                                  type: 'string',
                                },
                                value: {
                                  type: 'string',
                                },
                              },
                              required: ['unit', 'value'],
                            },
                          },
                          required: ['gps', 'radius'],
                        },
                      },
                      required: ['id', 'time', 'gps', 'address'],
                    },
                  },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      // Generic category validation - domains can extend this
                    },
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      // Generic item validation - domains can extend this
                    },
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'object',
                      // Generic provider tags validation
                    },
                  },
                  offers: {
                    type: 'array',
                    items: {
                      type: 'object',
                      // Generic offers validation
                    },
                  },
                },
                required: [
                  'id',
                  'time',
                  'fulfillments',
                  'descriptor',
                  'ttl',
                  'locations',
                  'items',
                  'tags',
                  'rating',
                ],
              },
            },
          },
          required: ['bpp/descriptor', 'bpp/providers'],
        },
      },
      required: ['catalog'],
    },
  },
  required: ['context', 'message'],
};
