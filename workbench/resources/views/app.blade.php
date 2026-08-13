<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') === 'dark'])>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  {{-- `dark` is a class variant here, so the system preference has to be applied
       before first paint or the page flashes light. HandleAppearance shares
       $appearance; this covers the 'system' case the cookie cannot answer. --}}
  <script>
    (function () {
      if ('{{ $appearance ?? 'system' }}' === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    })();
  </script>

  @viteReactRefresh
  @vite(['workbench/resources/css/app.css', 'workbench/resources/js/app.tsx'])
  @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>
