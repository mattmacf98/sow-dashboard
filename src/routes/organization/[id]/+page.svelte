<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-2xl px-4 py-12">
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to organizations
		</a>

		<div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
			<h1 class="text-2xl font-bold text-gray-900">Organization</h1>
			<p class="mt-2 text-sm text-gray-500">
				ID: <span class="font-mono text-gray-700">{page.params.id}</span>
			</p>
		</div>
	</div>
</div>
