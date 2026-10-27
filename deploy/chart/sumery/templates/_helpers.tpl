{{- define "sumery.labels" -}}
app.kubernetes.io/managed-by: Helm
app.kubernetes.io/part-of: sumery
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}

{{- define "sumery.selector" -}}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/name: web
{{- end -}}

{{- /* repo:tag[:digest]；tag 为空时输出 repo（值加引号，避免裸标量折叠） */ -}}
{{- define "sumery.image" -}}
{{- $v := . -}}
{{- $ref := $v.repository -}}
{{- if $v.tag -}}
{{- $ref = printf "%s:%s" $ref $v.tag -}}
{{- end -}}
{{- if $v.digest -}}
{{- $ref = printf "%s@%s" $ref $v.digest -}}
{{- end -}}
{{- $ref -}}
{{- end -}}
