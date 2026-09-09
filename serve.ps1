$port = 5173
$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "HTTP server successfully started at http://localhost:$port/"
    Write-Host "Serving files from: $root"

    $mimeTypes = @{
        ".html"  = "text/html; charset=utf-8"
        ".css"   = "text/css; charset=utf-8"
        ".js"    = "application/javascript; charset=utf-8"
        ".json"  = "application/json; charset=utf-8"
        ".svg"   = "image/svg+xml"
        ".png"   = "image/png"
        ".jpg"   = "image/jpeg"
        ".jpeg"  = "image/jpeg"
        ".gif"   = "image/gif"
        ".ico"   = "image/x-icon"
        ".woff2" = "font/woff2"
        ".woff"  = "font/woff"
        ".ttf"   = "font/ttf"
    }

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $urlPath = $request.Url.LocalPath
            if ($urlPath -eq "/" -or $urlPath -eq "") {
                $urlPath = "/index.html"
            }

            $relPath = $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
            $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $relPath))

            if ($fullPath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path $fullPath -PathType Leaf)) {
                $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
                $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $response.ContentType = $mime
                $response.StatusCode = 200

                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")

                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                $response.ContentLength64 = $bytes.Length

                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $errBytes.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                }
            }

            $response.OutputStream.Close()
        } catch {
            Write-Warning "Request error: $_"
        }
    }
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
