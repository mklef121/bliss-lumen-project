
{{-- includes the master blade template --}}
@extends('master.index')

{{-- display the homepage content --}}
@section('content')

{{-- display the page content --}}


           @include('performance.sections.allcategory-section')
@endsection