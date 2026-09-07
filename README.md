# 마이 마켓 나침반

API 키 없이 Yahoo Finance 공개 차트 응답에서 최근 1년의 일봉을 읽어, 종가·이동평균·모멘텀·변동성·1개월 통계 시나리오를 표시하는 정적 웹사이트입니다.

## GitHub Pages 배포

1. GitHub에서 새 공개 저장소를 만듭니다. 이름은 예: `market-compass`.
2. 이 폴더 안의 세 파일(`index.html`, `style.css`, `app.js`)을 저장소 최상위에 업로드합니다.
3. 저장소의 **Settings → Pages**에서 **Build and deployment**의 Source를 **Deploy from a branch**로 선택합니다.
4. Branch를 `main`, Folder를 `/(root)`로 설정하고 **Save**를 누릅니다.
5. 잠시 뒤 표시되는 `https://사용자이름.github.io/market-compass/` 주소로 접속합니다.

## 동작과 유의사항

- 방문 또는 `종가 새로고침` 클릭 시 최근 일봉을 다시 불러옵니다. 장중 값이 아니라 최신 확정 종가를 분석 대상으로 합니다.
- 보유 수량과 평균 매수가는 `localStorage`에만 저장되며 GitHub나 외부 서버로 전송하지 않습니다.
- Yahoo Finance 응답은 공식 공용 API 계약이 아니므로 장애·CORS 정책 변경 가능성이 있습니다. 공개·상업 서비스로 재배포하려면 적법한 데이터 라이선스를 갖춘 제공처로 교체하세요.
- 표시되는 전망은 과거 60거래일 수익률과 변동성의 통계적 범위일 뿐, 미래 수익이나 투자 판단을 보장하지 않습니다.
