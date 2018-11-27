
{{-- includes the master blade template --}}
@extends('master.index')

{{-- display the homepage content --}}
@section('content')

{{-- display the page content --}}
           @include('enroll_staff.sections.chief-section')
@endsection


@include('enroll_staff.sections.hidden-fields-section')