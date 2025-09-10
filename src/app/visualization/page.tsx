"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar } from "recharts"
import { TrendingUp, Target, BarChart3 } from "lucide-react"

interface LightCurveData {
  time: number
  flux: number
  starId: string
}

interface ConfidenceData {
  starId: string
  confidence: number
  label: string
}

interface ClassCountData {
  label: string
  count: number
}

// Mock data
const generateLightCurveData = (starId: string): LightCurveData[] => {
  const data: LightCurveData[] = []
  const baseTime = 2454833.0
  const baseFlux = 1.0
  
  for (let i = 0; i < 100; i++) {
    const time = baseTime + i * 0.1
    const flux = baseFlux + Math.sin(i * 0.2) * 0.01 + (Math.random() - 0.5) * 0.005
    data.push({ time, flux, starId })
  }
  
  return data
}

const mockLightCurves = {
  "KIC-1234567": generateLightCurveData("KIC-1234567"),
  "KIC-2345678": generateLightCurveData("KIC-2345678"),
  "KIC-3456789": generateLightCurveData("KIC-3456789"),
  "KIC-4567890": generateLightCurveData("KIC-4567890"),
}

const mockConfidenceData: ConfidenceData[] = [
  { starId: "KIC-1234567", confidence: 0.89, label: "Exoplanet" },
  { starId: "KIC-2345678", confidence: 0.76, label: "No Planet" },
  { starId: "KIC-3456789", confidence: 0.92, label: "Exoplanet" },
  { starId: "KIC-4567890", confidence: 0.68, label: "Anomaly" },
  { starId: "KIC-5678901", confidence: 0.84, label: "No Planet" },
  { starId: "KIC-6789012", confidence: 0.91, label: "Exoplanet" },
  { starId: "KIC-7890123", confidence: 0.73, label: "Anomaly" },
]

const mockClassCounts: ClassCountData[] = [
  { label: "Exoplanet", count: 45 },
  { label: "No Planet", count: 38 },
  { label: "Anomaly", count: 8 },
]

export default function Visualization() {
  const [selectedStarId, setSelectedStarId] = useState("KIC-1234567")
  const [selectedModel, setSelectedModel] = useState("CNN")
  const [threshold, setThreshold] = useState([0.7])
  
  const filteredConfidenceData = useMemo(() => {
    return mockConfidenceData.filter(d => d.confidence >= threshold[0])
  }, [threshold])

  const filteredClassCounts = useMemo(() => {
    const filtered = mockConfidenceData.filter(d => d.confidence >= threshold[0])
    const counts = filtered.reduce((acc, item) => {
      acc[item.label] = (acc[item.label] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(counts).map(([label, count]) => ({ label, count }))
  }, [threshold])

  const currentLightCurve = mockLightCurves[selectedStarId as keyof typeof mockLightCurves] || mockLightCurves["KIC-1234567"]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visualization</h2>
          <p className="text-muted-foreground">
            Interactive charts and visualizations for space data analysis
          </p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Visualization Controls</CardTitle>
            <CardDescription>
              Adjust parameters to explore your data interactively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Star ID</label>
                <Select value={selectedStarId} onValueChange={setSelectedStarId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a star" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(mockLightCurves).map((starId) => (
                      <SelectItem key={starId} value={starId}>
                        {starId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Model Type</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNN">CNN</SelectItem>
                    <SelectItem value="Random Forest">Random Forest</SelectItem>
                    <SelectItem value="SVM">SVM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Classification Threshold: {(threshold[0] * 100).toFixed(0)}%
                </label>
                <Slider
                  value={threshold}
                  onValueChange={setThreshold}
                  max={1}
                  min={0}
                  step={0.05}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Light Curve Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Light Curve: {selectedStarId}
            </CardTitle>
            <CardDescription>
              Time series data showing flux variations over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentLightCurve}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    type="number"
                    scale="linear"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <YAxis 
                    domain={['dataMin - 0.01', 'dataMax + 0.01']}
                    tickFormatter={(value) => value.toFixed(4)}
                  />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(4), 'Flux']}
                    labelFormatter={(value: number) => `Time: ${value.toFixed(1)}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="flux" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Scores Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Confidence Scores
            </CardTitle>
            <CardDescription>
              Scatter plot showing confidence scores for each star classification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={filteredConfidenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="starId" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    dataKey="confidence"
                    domain={[0, 1]}
                    tickFormatter={(value) => (value * 100).toFixed(0) + '%'}
                  />
                  <Tooltip 
                    formatter={(value: number) => [(value * 100).toFixed(1) + '%', 'Confidence']}
                    labelFormatter={(value: string) => `Star: ${value}`}
                  />
                  <Scatter 
                    dataKey="confidence" 
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Class Counts Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Predicted Class Counts
            </CardTitle>
            <CardDescription>
              Bar chart showing the distribution of predicted classes (filtered by threshold)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredClassCounts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockConfidenceData.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Above Threshold</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredConfidenceData.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(filteredConfidenceData.reduce((sum, d) => sum + d.confidence, 0) / filteredConfidenceData.length * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exoplanets</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredConfidenceData.filter(d => d.label === "Exoplanet").length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
