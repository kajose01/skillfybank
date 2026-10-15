package bank;
import java.util.List;
import java.util.Map;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class TransactionApplication {
  public static void main(String[] a) { SpringApplication.run(TransactionApplication.class, a); }
  @GetMapping("/transactions")
  public List<Map<String,Object>> tx() {
    String v = System.getenv().getOrDefault("APP_VERSION", "v1");
    return List.of(Map.of("id", 1, "amount", 250, "type", "deposit", "version", v));
  }
}
