import { defineCollection, z } from 'astro:content';

// 芯片/服务器数据
const chips = defineCollection({
  type: 'data',
  schema: z.object({
    chip: z.string(),
    chip_short: z.string(),
    aliases: z.array(z.string()).default([]),
    category: z.enum(['flagship', 'mainstream', 'legacy', 'roadmap']),
    status: z.enum(['shipping', 'preview', 'roadmap']),
    vendor: z.string(),
    release: z.string(),
    summary: z.string(),
    memory: z.object({
      per_card_gb: z.number().nullable(),
      type: z.string()
    }),
    compute: z.object({
      fp16_tflops: z.number().nullable(),
      int8_tops: z.number().nullable(),
      bf16_tflops: z.number().nullable()
    }),
    interconnect: z.object({
      type: z.string(),
      bandwidth_gbps: z.number().nullable(),
      topology: z.string().nullable()
    }),
    system: z.object({
      cpu: z.string(),
      cpu_cores: z.number().nullable(),
      ram_gb: z.number().nullable(),
      nic: z.string().nullable(),
      psu_w: z.number().nullable()
    }),
    software: z.object({
      os: z.string(),
      cann: z.string(),
      mindie: z.string().nullable(),
      frameworks: z.array(z.string())
    }),
    price_rmb_wan: z.object({
      low: z.number().nullable(),
      high: z.number().nullable(),
      note: z.string().nullable()
    }).nullable(),
    use_cases: z.array(z.string()),
    notes: z.array(z.string()).default([]),
    models: z.array(z.object({
      model: z.string(),
      params: z.string(),
      quantization: z.string(),
      framework: z.string(),
      status: z.enum(['verified', 'partial', 'unsupported', 'untested']),
      cards: z.number(),
      ttft_ms: z.record(z.string(), z.union([z.number(), z.null()])).optional(),
      tpot_ms: z.record(z.string(), z.union([z.number(), z.null()])).optional(),
      e2e_s: z.union([z.number(), z.null()]).optional(),
      throughput_tps: z.union([z.number(), z.null()]).optional(),
      vram_gb: z.union([z.number(), z.null()]).optional(),
      config: z.string().optional()
    }))
  })
});

export const collections = { chips };
