"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, Database, Filter, TrendingUp, Zap } from "lucide-react"

interface DataRow {
  id: string
  starId: string
  time: number
  flux: number
  error: number
  quality: string
}

const mockData: DataRow[] = [
  { id: "1", starId: "KIC-1234567", time: 2454833.0, flux: 1.0001, error: 0.0001, quality: "Good" },
  { id: "2", starId: "KIC-1234567", time: 2454833.1, flux: 0.9998, error: 0.0001, quality: "Good" },
  { id: "3", starId: "KIC-1234567", time: 2454833.2, flux: 1.0002, error: 0.0001, quality: "Good" },
  { id: "4", starId: "KIC-2345678", time: 2454833.0, flux: 0.9985, error: 0.0002, quality: "Fair" },
  { id: "5", starId: "KIC-2345678", time: 2454833.1, flux: 0.9991, error: 0.0002, quality: "Fair" },
  { id: "6", starId: "KIC-3456789", time: 2454833.0, flux: 1.0015, error: 0.0001, quality: "Good" },
  { id: "7", starId: "KIC-3456789", time: 2454833.1, flux: 0.9989, error: 0.0001, quality: "Good" },
  { id: "8", starId: "KIC-4567890", time: 2454833.0, flux: 0.9995, error: 0.0003, quality: "Poor" },
]

export default function DataHub() {
  const [uploadedData, setUploadedData] = useState<DataRow[]>(mockData)
  const [preprocessingOptions, setPreprocessingOptions] = useState({
    normalize: false,
    detrend: false,
    filterNoise: false
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would parse the CSV/JSON file here
      console.log("File uploaded:", file.name)
      // For demo purposes, we'll just add some mock data
      const newData: DataRow = {
        id: (uploadedData.length + 1).toString(),
        starId: `KIC-${Math.floor(Math.random() * 9000000) + 1000000}`,
        time: 2454833.0 + Math.random(),
        flux: 0.99 + Math.random() * 0.02,
        error: 0.0001 + Math.random() * 0.0002,
        quality: Math.random() > 0.7 ? "Good" : Math.random() > 0.4 ? "Fair" : "Poor"
      }
      setUploadedData([...uploadedData, newData])
    }
  }

  const togglePreprocessing = (option: keyof typeof preprocessingOptions) => {
    setPreprocessingOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Hub</h2>
          <p className="text-muted-foreground">
            Upload and manage your space observation data
          </p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Data Upload
            </CardTitle>
            <CardDescription>
              Upload CSV or JSON files containing light curve data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </span>
                  </Button>
                </label>
                <span className="text-sm text-muted-foreground">
                  Supported formats: CSV, JSON
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preprocessing Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Preprocessing Controls
            </CardTitle>
            <CardDescription>
              Configure data preprocessing options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="normalize"
                  checked={preprocessingOptions.normalize}
                  onChange={() => togglePreprocessing('normalize')}
                  className="rounded border-gray-300"
                />
                <label htmlFor="normalize" className="text-sm font-medium">
                  Normalize Data
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="detrend"
                  checked={preprocessingOptions.detrend}
                  onChange={() => togglePreprocessing('detrend')}
                  className="rounded border-gray-300"
                />
                <label htmlFor="detrend" className="text-sm font-medium">
                  Detrend
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="filter-noise"
                  checked={preprocessingOptions.filterNoise}
                  onChange={() => togglePreprocessing('filterNoise')}
                  className="rounded border-gray-300"
                />
                <label htmlFor="filter-noise" className="text-sm font-medium">
                  Filter Noise
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uploadedData.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Stars</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(uploadedData.map(d => d.starId)).size}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Good Quality</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {uploadedData.filter(d => d.quality === 'Good').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Flux</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(uploadedData.reduce((sum, d) => sum + d.flux, 0) / uploadedData.length).toFixed(4)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Data</CardTitle>
            <CardDescription>
              Scrollable table showing all uploaded light curve data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Star ID</TableHead>
                    <TableHead>Time (JD)</TableHead>
                    <TableHead>Flux</TableHead>
                    <TableHead>Error</TableHead>
                    <TableHead>Quality</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>{row.starId}</TableCell>
                      <TableCell>{row.time.toFixed(1)}</TableCell>
                      <TableCell>{row.flux.toFixed(4)}</TableCell>
                      <TableCell>{row.error.toFixed(4)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          row.quality === 'Good' ? 'bg-green-100 text-green-800' :
                          row.quality === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {row.quality}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
