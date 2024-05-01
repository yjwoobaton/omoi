 {/* 폼 제출 이후 */}
 <div>
 <p className="text-gray-700 font-medium text-lg text-left">이메일 인증</p>
 <p className="text-gray-700 font-medium text-base text-left">
   아래 이메일로 인증 메일을 발송해드렸어요. 이메일 인증이 완료되면 회원가입이 완료됩니다.
 </p>
 <Input name="email" label="" type="email" disabled value={"hello"} />
 <Link href="/signin">
   <Button content="로그인" type="primary" />
 </Link>
</div>