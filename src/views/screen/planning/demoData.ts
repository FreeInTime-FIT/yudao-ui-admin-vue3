export const HOURS = Array.from({ length: 24 }, (_, hour) => hour)

export type Phase = 'A' | 'B' | 'C'

export interface PlanningNode {
  id: number
  sourceId: string
  baseKv: number
  loadMw: number
  reactiveMvar: number
  x: number
  y: number
}

export interface PlanningBranch {
  id: string
  from: number
  to: number
  ratingMw: number
  resistance: number
  reactance: number
}

export interface StorageProfile {
  id: string
  nodeId: number
  capacityKwh: number
  powerKw: number
  chargeRaw: number[]
  dischargeRaw: number[]
  soc: number[]
}

export interface PlanningParameters {
  periodYears: number
  discountRate: number
  voltageLowerLimit: number
  voltageUpperLimit: number
  unitCapacityKwh: number
  unitPowerKw: number
  chargeEfficiency: number
  dischargeEfficiency: number
  selfDischargeRate: number
  replacementCycles: number
  investmentCostPerKwh: number
  operationCostPerKwh: number
  replacementCostPerKwh: number
}

const positions = [
  [60, 190],
  [180, 120],
  [180, 310],
  [300, 55],
  [300, 185],
  [420, 120],
  [420, 250],
  [540, 55],
  [540, 185],
  [660, 55],
  [660, 185],
  [780, 55],
  [780, 185],
  [900, 185],
  [1020, 185],
  [1140, 120],
  [1140, 250]
] as const

const sourceIds = [
  '3379388570388135937',
  '3379388570388135938',
  '3379388570388135939',
  '3379388570388135940',
  '3379388570388135941',
  '3379388570388135942',
  '3379388570388135943',
  '3379388570388135944',
  '3379388570388135945',
  '3379388570388135946',
  '3379388570388135947',
  '3379388570388135948',
  '3379388570388135949',
  '3379388570388135950',
  '3379388570388135951',
  '3379388570388135952',
  '3379388570388135953'
] as const

const unloadedNodes = new Set([1, 3, 4, 11])

export const PLANNING_NODES: PlanningNode[] = positions.map(([x, y], index) => {
  const id = index + 1
  const hasLoad = !unloadedNodes.has(id)
  return {
    id,
    sourceId: sourceIds[index],
    baseKv: 10,
    loadMw: hasLoad ? 0.6 : 0,
    reactiveMvar: hasLoad ? 0.3 : 0,
    x,
    y
  }
})

export const PLANNING_BRANCHES: PlanningBranch[] = [
  { id: 'L1', from: 1, to: 2, ratingMw: 2.3, resistance: 0.02, reactance: 0.02 },
  { id: 'L2', from: 1, to: 3, ratingMw: 2.3, resistance: 0.02, reactance: 0.02 },
  { id: 'L3', from: 2, to: 4, ratingMw: 2.3, resistance: 0.02, reactance: 0.02 },
  { id: 'L4', from: 2, to: 5, ratingMw: 2.3, resistance: 0.0006318, reactance: 0.0010602 },
  { id: 'L5', from: 5, to: 6, ratingMw: 2.3, resistance: 0.00414882, reactance: 0.00696198 },
  { id: 'L6', from: 5, to: 7, ratingMw: 2.3, resistance: 0.0004212, reactance: 0.0007068 },
  { id: 'L7', from: 6, to: 8, ratingMw: 2.3, resistance: 0.0037908, reactance: 0.0063612 },
  { id: 'L8', from: 7, to: 9, ratingMw: 2.3, resistance: 0.0004212, reactance: 0.0007068 },
  { id: 'L9', from: 8, to: 10, ratingMw: 2.3, resistance: 0.0037908, reactance: 0.0063612 },
  { id: 'L10', from: 9, to: 11, ratingMw: 2.3, resistance: 0.0037908, reactance: 0.0063612 },
  { id: 'L11', from: 10, to: 12, ratingMw: 2.3, resistance: 0.0040014, reactance: 0.0067146 },
  { id: 'L12', from: 11, to: 13, ratingMw: 2.3, resistance: 0.0004212, reactance: 0.0007068 },
  { id: 'L13', from: 13, to: 14, ratingMw: 2.3, resistance: 0.00414882, reactance: 0.00696198 },
  { id: 'L14', from: 14, to: 15, ratingMw: 2.3, resistance: 0.00414882, reactance: 0.00696198 },
  { id: 'L15', from: 15, to: 16, ratingMw: 2.3, resistance: 0.00414882, reactance: 0.00696198 },
  { id: 'L16', from: 15, to: 17, ratingMw: 2.3, resistance: 0.00414882, reactance: 0.00696198 }
]

export const DEFAULT_PARAMETERS: PlanningParameters = {
  periodYears: 10,
  discountRate: 0.075,
  voltageLowerLimit: 0.9,
  voltageUpperLimit: 1.07,
  unitCapacityKwh: 100,
  unitPowerKw: 50,
  chargeEfficiency: 0.95,
  dischargeEfficiency: 0.95,
  selfDischargeRate: 0.0001,
  replacementCycles: 30,
  investmentCostPerKwh: 1200,
  operationCostPerKwh: 7.5,
  replacementCostPerKwh: 525
}

const referenceVoltage = [
  0.97797, 0.97906, 0.97947, 0.97748, 0.97983, 0.97871, 0.98292, 1.02267, 0.90978, 0.89999, 0.9,
  0.90001, 0.91608, 0.90303, 0.90022, 0.89999, 0.99431, 0.92572, 0.98724, 0.97536, 0.98417, 0.98019,
  0.98166, 0.98192
]

const phaseOffsets: Record<Phase, number> = {
  A: 0.0008,
  B: -0.0005,
  C: -0.0003
}

export const voltageSeries = (nodeId: number, phase: Phase): number[] => {
  const distanceFactor = Math.max(0, Math.min(1, (nodeId - 1) / 16))
  const attenuation = 0.12 + distanceFactor * 0.88
  return referenceVoltage.map((value, hour) => {
    const phaseRipple = phaseOffsets[phase] * (0.7 + Math.sin((hour + nodeId) / 3) * 0.3)
    return Number((1 + (value - 1) * attenuation + phaseRipple).toFixed(5))
  })
}

export const baselineVoltageSeries = (nodeId: number, phase: Phase): number[] =>
  HOURS.map((hour) => {
    const phaseRipple = phaseOffsets[phase] * 0.4
    const loadRipple = Math.sin(((hour - 7) / 24) * Math.PI * 2) * nodeId * 0.000015
    return Number((1 + phaseRipple - loadRipple).toFixed(5))
  })

export const loadProfile = HOURS.map((hour) => {
  const morning = Math.exp(-Math.pow((hour - 9) / 3.1, 2))
  const evening = Math.exp(-Math.pow((hour - 18) / 3.8, 2))
  return Number((0.48 + morning * 0.24 + evening * 0.42).toFixed(4))
})

export const branchLoadingAt = (branch: PlanningBranch, hour: number): number => {
  const downstreamWeight = Math.max(1, 18 - branch.to)
  const topologyFactor = Math.min(1.22, 0.24 + downstreamWeight * 0.052)
  const impedanceFactor = Math.min(0.16, (branch.resistance + branch.reactance) * 2)
  return Number((loadProfile[hour] * topologyFactor + impedanceFactor).toFixed(4))
}

export const estimatedLossAt = (nodeId: number, hour: number): number => {
  const depthFactor = 0.3 + nodeId / 20
  return Number((loadProfile[hour] * depthFactor * 0.018).toFixed(4))
}

export const STORAGE_PROFILES: StorageProfile[] = [
  {
    id: 'ESS-05',
    nodeId: 5,
    capacityKwh: 100,
    powerKw: 50,
    chargeRaw: [
      0.051, 0.048, 0.043, 0.038, 0.033, 0.027, 0.019, 0.055, 0.166, 0.195, 0.32, 0.256, 0.101,
      0.207, 0.191, 0.19, 0, 0.027, 0, 0.003, 0.027, 0.035, 0.037, 0.037
    ],
    dischargeRaw: [
      0.037, 0.031, 0.032, 0.037, 0.043, 0.052, 0.07, 0.05, 0.15, 0.165, 0.024, 0, 0.054, 0.114,
      0.17, 0.171, 0.162, 0.087, 0.137, 0.078, 0.049, 0.041, 0.038, 0.038
    ],
    soc: [
      0.081, 0.095, 0.102, 0.099, 0.085, 0.056, 0, 0, 0, 0.012, 0.29, 0.534, 0.572, 0.649, 0.651,
      0.651, 0.481, 0.415, 0.271, 0.191, 0.165, 0.155, 0.15, 0.146
    ]
  },
  {
    id: 'ESS-06',
    nodeId: 6,
    capacityKwh: 100,
    powerKw: 50,
    chargeRaw: [
      0.09, 0.077, 0.067, 0.058, 0.049, 0.039, 0.027, 0.082, 0.188, 0.277, 0.364, 0.069, 0, 0.345,
      0.197, 0.197, 0.045, 0.069, 0, 0.021, 0.046, 0.053, 0.055, 0.056
    ],
    dischargeRaw: [
      0.042, 0.042, 0.048, 0.055, 0.065, 0.08, 0.106, 0.074, 0.17, 0.073, 0.004, 0.133, 0.077,
      0.025, 0.177, 0.177, 0.162, 0.084, 0.152, 0.095, 0.068, 0.06, 0.058, 0.057
    ],
    soc: [
      0.116, 0.146, 0.159, 0.155, 0.133, 0.085, 0, 0, 0, 0.186, 0.527, 0.453, 0.372, 0.672, 0.673,
      0.673, 0.545, 0.522, 0.362, 0.282, 0.254, 0.241, 0.232, 0.226
    ]
  },
  {
    id: 'ESS-09',
    nodeId: 9,
    capacityKwh: 100,
    powerKw: 50,
    chargeRaw: [
      13.161, 11.03, 9.405, 7.62, 5.563, 3.568, 2.878, 9.745, 9.905, 11.157, 18.825, 0.473, 18.303,
      17.75, 9.917, 9.914, 9.741, 1.384, 10.604, 12.205, 8.235, 6.936, 6.5, 7.039
    ],
    dischargeRaw: [
      2.201, 3.66, 5.285, 7.129, 9.296, 11.485, 12.552, 8.795, 8.94, 7.7, 0.032, 18.385, 0.555,
      1.108, 8.94, 8.943, 8.91, 15.656, 3.363, 3.139, 7.287, 8.108, 8.482, 7.852
    ],
    soc: [
      13.958, 20.582, 23.952, 23.684, 19.181, 10.48, 0, 0, 0, 2.494, 20.344, 1.438, 18.242, 33.936,
      33.943, 33.944, 33.815, 18.646, 25.178, 33.466, 33.615, 31.667, 28.91, 27.329
    ]
  },
  {
    id: 'ESS-13',
    nodeId: 13,
    capacityKwh: 200,
    powerKw: 100,
    chargeRaw: [
      10.026, 11.817, 12.53, 13.601, 16.226, 17.425, 22.268, 43.956, 44.11, 44.173, 44.106, 80.485,
      83.154, 15.443, 72.971, 44.146, 43.897, 1.812, 2.209, 3.264, 11.363, 19.352, 20.22, 20.809
    ],
    dischargeRaw: [
      12.882, 13.043, 14.085, 15.063, 15.359, 17.765, 21.518, 39.67, 39.809, 39.803, 39.869, 3.491,
      0.822, 68.533, 11.004, 39.827, 39.795, 24.138, 20.362, 18.387, 15.774, 21.81, 21.012, 22.144
    ],
    soc: [
      12.759, 10.255, 7.332, 4.396, 3.643, 1.496, 0, 0, 0, 0.066, 0, 72.786, 150.91, 93.425,
      151.156, 151.156, 150.953, 127.251, 107.903, 91.638, 85.82, 81.238, 78.321, 74.773
    ]
  },
  {
    id: 'ESS-14',
    nodeId: 14,
    capacityKwh: 400,
    powerKw: 200,
    chargeRaw: [
      8.018, 9.515, 13.469, 16.582, 22.385, 29.229, 62.574, 114.946, 115.238, 132.795, 149.417,
      145.058, 148.516, 188.881, 124.065, 115.287, 114.996, 0.488, 1.011, 2.338, 48.011, 51.273,
      64.486, 67.906
    ],
    dischargeRaw: [
      27.958, 18.548, 16.536, 17.617, 20.719, 28.383, 57.899, 103.738, 104.002, 86.496, 69.873,
      74.233, 70.775, 30.41, 95.226, 104.003, 103.969, 42.231, 32.83, 35.913, 57.445, 61.36, 70.163,
      72.641
    ],
    soc: [
      22.046, 11.559, 6.947, 4.155, 3.611, 1.502, 0, 0, 0, 35.107, 103.499, 163.154, 229.728,
      377.131, 394.717, 394.723, 394.489, 350.46, 316.827, 281.214, 266.328, 250.421, 237.802,
      225.825
    ]
  }
]

export const exclusiveDispatch = (profile: StorageProfile) => {
  const charge: number[] = []
  const discharge: number[] = []
  let conflictCount = 0

  HOURS.forEach((hour) => {
    const charging = Math.max(0, profile.chargeRaw[hour] || 0)
    const discharging = Math.max(0, profile.dischargeRaw[hour] || 0)
    if (charging > 0.000001 && discharging > 0.000001) conflictCount += 1
    const net = charging - discharging
    charge.push(Number(Math.max(0, net).toFixed(3)))
    discharge.push(Number(Math.max(0, -net).toFixed(3)))
  })

  return { charge, discharge, conflictCount }
}

export const totalRealLoadMw = PLANNING_NODES.reduce((sum, node) => sum + node.loadMw, 0)
export const totalReactiveLoadMvar = PLANNING_NODES.reduce(
  (sum, node) => sum + node.reactiveMvar,
  0
)
