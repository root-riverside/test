# 마이 마켓 나침반

API 키 없이 GitHub Actions가 Yahoo Finance 공개 차트 응답에서 하루 한 번 최근 1년 일봉을 저장합니다. 사이트는 저장된 종가로 이동평균·모멘텀·변동성·1개월 통계 시나리오를 표시합니다.

## GitHub Pages 배포

1. GitHub에서 새 공개 저장소를 만듭니다. 이름은 예: `market-compass`.
2. 이 폴더의 내용을 **폴더째가 아니라 그 안의 파일과 폴더 전체**를 저장소 최상위에 업로드합니다. `.github/workflows/update-closes.yml`과 `scripts/update-market-data.mjs`가 꼭 포함되어야 합니다.
3. 저장소의 **Settings → Pages**에서 **Build and deployment**의 Source를 **Deploy from a branch**로 선택합니다.
4. Branch를 `main`, Folder를 `/(root)`로 설정하고 **Save**를 누릅니다.
5. 잠시 뒤 표시되는 `https://사용자이름.github.io/market-compass/` 주소로 접속합니다.

## 첫 종가 데이터 만들기 및 자동 갱신 확인

1. 저장소 상단의 **Actions**를 열고 `Update daily close data`를 선택합니다.
2. **Run workflow → Run workflow**를 눌러 한 번 실행합니다.
3. 완료되면 저장소에 `data/market.json` 파일과 `chore: update daily close data` 커밋이 생깁니다. 사이트를 새로고침하면 종가가 표시됩니다.
4. 이후에는 GitHub Actions가 평일 한국시간 오전 7시에 자동으로 갱신합니다. GitHub의 기본 브랜치에서 Actions 권한이 읽기 전용이면 **Settings → Actions → General → Workflow permissions → Read and write permissions**를 선택해야 자동 커밋이 됩니다.

## 동작과 유의사항

- `종가 새로고침`은 GitHub에 저장된 최신 확정 종가 파일을 다시 읽습니다. 장중 값이 아니라 GitHub Actions가 장 마감 뒤 저장한 종가를 분석 대상으로 합니다.
- 보유 수량과 평균 매수가는 `localStorage`에만 저장되며 GitHub나 외부 서버로 전송하지 않습니다.
- Yahoo Finance 응답은 공식 공용 API 계약이 아니므로 장애·제공 정책 변경 가능성이 있습니다. 공개·상업 서비스로 재배포하려면 적법한 데이터 라이선스를 갖춘 제공처로 교체하세요.
- 표시되는 전망은 과거 60거래일 수익률과 변동성의 통계적 범위일 뿐, 미래 수익이나 투자 판단을 보장하지 않습니다.
