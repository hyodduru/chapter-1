import { Header, Footer } from "../../shared/components";

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          ${[
            "홍길동|5분 전|오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
            "김철수|15분 전|새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
            "이영희|30분 전|오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
            "박민수|1시간 전|주말에 등산 가실 분 계신가요? 함께 가요!",
            "정수연|2시간 전|새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
          ]
            .map((data) => {
              const [name, time, content] = data.split("|");
              return `
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center mb-2">
                <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
                <div>
                  <p class="font-bold">${name}</p>
                  <p class="text-sm text-gray-500">${time}</p>
                </div>
              </div>
              <p>${content}</p>
              <div class="mt-2 flex justify-between text-gray-500">
                <button>좋아요</button>
                <button>댓글</button>
                <button>공유</button>
              </div>
            </div>
          `;
            })
            .join("")}
        </div>
      </main>
      ${Footer()}
    </div>
  </div>
`;

export default MainPage;
