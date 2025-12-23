# FOOT AI 클라우드 배포 가이드

## Vercel 배포 (추천)

Vercel은 Next.js 앱을 배포하기 가장 쉬운 플랫폼입니다.

### 1단계: Vercel 계정 생성

1. [Vercel 웹사이트](https://vercel.com) 방문
2. "Sign Up" 클릭
3. GitHub 계정으로 가입 (권장)

### 2단계: GitHub 저장소 연결

1. Vercel 대시보드에서 "Add New Project" 클릭
2. "Import Git Repository" 선택
3. `foot-ai` 저장소 선택
4. 브랜치 선택: `claude/create-foot-ai-web-VPRUY` (또는 메인 브랜치)

### 3단계: 환경 변수 설정

프로젝트 설정에서 다음 환경 변수를 추가:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**중요**: API 키는 절대 GitHub에 커밋하지 마세요!

### 4단계: 배포

1. "Deploy" 버튼 클릭
2. 2-3분 대기
3. 배포 완료!

Vercel이 자동으로 다음을 제공합니다:
- HTTPS URL (예: `https://foot-ai-xxx.vercel.app`)
- 자동 CI/CD (GitHub에 푸시하면 자동 재배포)
- 글로벌 CDN
- 무료 SSL 인증서

### 5단계: 도메인 연결 (선택사항)

1. Vercel 프로젝트 설정 → "Domains"
2. 원하는 도메인 입력
3. DNS 설정 따라하기

---

## 다른 클라우드 플랫폼

### Netlify

1. [Netlify](https://netlify.com) 가입
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 연결
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. 환경 변수 추가 (ANTHROPIC_API_KEY, OPENAI_API_KEY)
6. Deploy

### Railway

1. [Railway](https://railway.app) 가입
2. "New Project" → "Deploy from GitHub repo"
3. 저장소 선택
4. 환경 변수 추가
5. 자동으로 배포 시작

### AWS Amplify

1. [AWS Amplify Console](https://console.aws.amazon.com/amplify) 접속
2. "New app" → "Host web app"
3. GitHub 연결
4. 저장소 선택
5. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
6. 환경 변수 추가
7. Save and deploy

### Google Cloud Run

1. 프로젝트에 Dockerfile 추가 필요
2. Google Cloud Console에서 프로젝트 생성
3. Cloud Run 서비스 생성
4. 컨테이너 이미지 배포
5. 환경 변수 설정

---

## 비용 비교

| 플랫폼 | 무료 티어 | 장점 |
|--------|-----------|------|
| **Vercel** | 100GB 대역폭/월 | Next.js에 최적화, 가장 쉬움 |
| **Netlify** | 100GB 대역폭/월 | 간단한 UI, 좋은 문서 |
| **Railway** | $5 크레딧/월 | 데이터베이스 통합 쉬움 |
| **AWS Amplify** | 12개월 무료 | AWS 생태계 통합 |

---

## 배포 후 확인사항

✅ 환경 변수가 올바르게 설정되었는지 확인
✅ HTTPS가 작동하는지 확인
✅ API 호출이 정상 작동하는지 테스트
✅ 모바일에서도 잘 보이는지 확인

---

## 문제 해결

### API 키 오류
- Vercel 대시보드 → Settings → Environment Variables 확인
- 변수 이름이 정확한지 확인 (대소문자 구분)
- 재배포 필요 (환경 변수 변경 시)

### 빌드 실패
- Vercel 로그 확인
- Node.js 버전 확인 (18+ 필요)
- package.json dependencies 확인

### 느린 응답 속도
- API 키 할당량 확인
- Vercel 리전 설정 확인 (vercel.json에서 `"regions": ["icn1"]` 설정)

---

## 추천 배포 순서

1. **먼저 Vercel로 시작** (가장 쉬움)
2. 잘 작동하면 그대로 사용
3. 더 많은 기능 필요시 다른 플랫폼 고려

**Vercel 배포는 5분이면 완료됩니다!**
