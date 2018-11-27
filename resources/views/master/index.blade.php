{{-- This includes the header for loading all css files --}}

@include('includes.head') 


{{-- Loads Sidebar bar --}}
@include('includes.sidebar')

{{-- Loads Navigation bar --}}
@include('includes.headbar')

{{-- Loads the breadcrumb associated with the page --}}
{{-- @yield('breadcrumb')  --}}

@include('includes.modals')

{{-- Loads the body contents of the page --}}
@yield('content') 




{{-- Loads the footer and associated javascript files --}}
@include('includes.footer')
